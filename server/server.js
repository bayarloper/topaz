// server.js
const cors = require("cors");
const express = require("express");
const sqlite = require("better-sqlite3");
const path = require("path");
const bcrypt = require('bcrypt');


// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, "mydatabase.db");

// Create a new SQLite database connection
const db = new sqlite(dbPath);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Define your API endpoints
app.get("/api/about", (req, res) => {
  const data = db.prepare("SELECT * FROM about").all();
  res.json(data);
});

app.get("/api/blogpost", (req, res) => {
  const data = db.prepare("SELECT * FROM blog_posts").all();
  res.json(data);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user with the given username
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Check if the password matches using bcrypt
  bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Successful login
      return res.status(200).json({ message: 'Login successful', user });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
