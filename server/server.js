const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());
const postRoutes = require("./routes/postRoutes");
app.post("/api/posts", (req, res) => {
  console.log("Received data:", req.body);
  res.status(201).json({ message: "Post received successfully" });
});

app.use("/api/posts", postRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("API is running... ✅");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  // Start server only after DB connects
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
