const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../mydatabase.db");
const db = new sqlite(dbPath);

exports.getAllWorkItems = (req, res) => {
  try {
    const workItems = db.prepare("SELECT * FROM workItem").all();
    res.json(workItems);
  } catch (error) {
    console.error("Error fetching work items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to update a work item by ID
exports.updateWorkItem = (id, updatedData) => {
  // Example: Reading image data from a file
  const fs = require("fs");

  // Read image data from a file
  const imageData = fs.readFileSync("path/to/image.jpg");

  // Prepare the SQL query with a placeholder for the image data
  const stmt = db.prepare(
    "INSERT INTO workItem (title, text, image) VALUES (?, ?, ?)"
  );

  // Execute the query with the provided parameters
  stmt.run(title, text, imageData);
};

exports.deleteWorkItem = (req, res) => {
  const { id } = req.params;

  try {
    db.prepare("DELETE FROM workItem WHERE id = ?").run(id);
    res.json({ message: "Work item deleted successfully" });
  } catch (error) {
    console.error("Error deleting work item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
