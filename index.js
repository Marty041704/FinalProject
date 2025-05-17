import express from 'express'; //server
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';
import dotenv from 'dotenv';
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

app.get('/api', (req, res) => {
    res.send('REST API is working');
})

// database connection
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

//Register a user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO login_tbl (username, password) VALUES (?, ?)';

    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      console.log('User registered:', { username, hashedPassword });
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Login a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const sql = 'SELECT * FROM login_tbl WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];
    console.log('Found user:', user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, secret_key, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
});

// Retrieve all blog posts
app.get('/posts', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM blog_tbl';
  
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json(results);
    });
  });
