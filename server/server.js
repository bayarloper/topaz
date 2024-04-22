// server.js
const cors = require("cors");
const express = require("express");
const sqlite = require("better-sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");

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

// Update about table
app.put("/api/about/update/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    db.prepare("UPDATE about SET description = ? WHERE id = ?").run(
      description,
      id
    );
    res
      .status(200)
      .json({ message: "About page description updated successfully" });
  } catch (error) {
    console.error("Error updating about page description:", error);
    res
      .status(500)
      .json({ message: "Error updating about page description", error });
  }
});

// Fetch current data for about page
app.get("/api/about", (req, res) => {
  const data = db.prepare("SELECT title, description FROM about").get();
  res.json(data);
});

// GET route to fetch all blog posts
app.get("/api/blogpost", (req, res) => {
  const data = db.prepare("SELECT * FROM blog_posts").all();
  res.json(data);
});

// POST route to add a new blog post
app.post("/api/blogpost", (req, res) => {
  const { title, content, author, created_at, image, content_full } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO blog_posts (title, content, author, created_at, image, content_full) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(
      title,
      content,
      author,
      created_at,
      image,
      content_full
    );

    res.status(201).json({
      message: "Blog post added successfully",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error adding blog post:", error);
    res.status(500).json({ message: "Error adding blog post", error });
  }
});

// PUT route to update an existing blog post
app.put("/api/blogpost/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, author, created_at, image, content_full } = req.body;

  try {
    const stmt = db.prepare(
      "UPDATE blog_posts SET title = ?, content = ?, author = ?, created_at = ?, image = ?, content_full = ? WHERE id = ?"
    );
    const result = stmt.run(
      title,
      content,
      author,
      created_at,
      image,
      content_full,
      id
    );

    if (result.changes > 0) {
      res.json({ message: "Blog post updated successfully" });
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ message: "Error updating blog post", error });
  }
});

// DELETE route to delete a blog post
app.delete("/api/blogpost/:id", (req, res) => {
  const { id } = req.params;

  try {
    const result = db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);

    if (result.changes > 0) {
      res.json({ message: "Blog post deleted successfully" });
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ message: "Error deleting blog post", error });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user with the given username
  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Check if the password matches using bcrypt
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Successful login
    return res.status(200).json({ message: "Login successful", user });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
