import express from 'express'; // Server
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const secret_key = process.env.secret_key;
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start server
app.listen(port, () => {
  console.log('Running on port ' + port);
  console.log('Server is running on http://localhost:' + port);
});

// Test API endpoint
app.get('/api', (req, res) => {
  res.send('REST API is working');
});

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// rate limiter
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2mins
  max: 100, //100 reqs
  message: { message: "Too many requests from this IP, please try again later." }
});
app.use(limiter);

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
 try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO login_tbl (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Username already exists' });
          }
          return res.status(500).json({ message: 'Database error', error: err });
        }

        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM login_tbl WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.ID, username: user.username },
        secret_key,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login successful', token });
    }
  );
});

// Authenticate JWT Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, secret_key, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Retrieve all blog posts
app.get('/posts', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM blog_tbl';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Retrieve specific blog post (protected)
app.get('/posts/:id', authenticateToken, (req, res) => {
  db.query('SELECT * FROM blog_tbl WHERE ID = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Post not found' });
    res.json(results[0]);
  });
});

// Create new blog post (protected)
app.post('/posts', authenticateToken, (req, res) => {
  const { title, content, author } = req.body;
  const sql = 'INSERT INTO blog_tbl (Title, Content, Author) VALUES (?, ?, ?)';
  db.query(sql, [title, content, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, title, content, author });
  });
});

// Update blog post (protected)
app.put('/posts/:id', authenticateToken, (req, res) => {
  const { title, content, author } = req.body;
  const sql = 'UPDATE blog_tbl SET Title = ?, Content = ?, Author = ? WHERE ID = ?';
  db.query(sql, [title, content, author, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, title, content, author });
  });
});

// Delete blog post (protected)
app.delete('/posts/:id', authenticateToken, (req, res) => {
  db.query('DELETE FROM blog_tbl WHERE ID = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No post found with the provided ID' });
    }

    res.json({ message: 'Post deleted', id: req.params.id });
  });
});

