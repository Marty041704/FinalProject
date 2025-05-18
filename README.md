Final Project - ASIA
Rod Marty C. Mendoza – BSIT-NT-3201
Database: MySQL
Backend Environment: XAMPP (Apache + MySQL)
API Server Runtime: Node.js

API Endpoints and Methods:

User Authentication:
Register: POST http://localhost:3000/register
Login: POST http://localhost:3000/login

Blog Post Management:
Retrieve all posts: GET http://localhost:3000/posts
Retrieve a specific post: GET http://localhost:3000/posts/:id
Create a new post: POST http://localhost:3000/posts
Update a post: PUT http://localhost:3000/posts/:id
Delete a post: DELETE http://localhost:3000/posts/:id

Additional Features:
Security: Token-based authentication using JWT

Rate Limiting: Allows up to 100 transactions per 2 minutes per user

Demo Video:
Drive video link – (BatStateU domain access required)
https://drive.google.com/drive/folders/1YWpHSARxg2TQV6fDkGQph6_KZuey_82-?usp=sharing