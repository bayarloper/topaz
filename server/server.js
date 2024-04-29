const cors = require("cors");
const express = require("express");
const aboutRoutes = require("./routes/aboutRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/about", aboutRoutes);
app.use("/api/blogpost", blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
