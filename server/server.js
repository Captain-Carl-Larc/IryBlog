// Imports
const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoute"); // Import your user routes
const blogRoutes = require('./routes/blogRoute')

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Basic middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for all routes (you might want to configure this more strictly in production)

// --- API Routes ---
// Mount the user routes under the /api/users path
app.use("/api/users", userRoutes);

//mount blog routes
app.use('/api/posts',blogRoutes)

// Simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get port from environment variables, default to 5000 if not set
const PORT = process.env.PORT || 5000;

// Start the server AFTER connecting to the database
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI); // Await the DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `MongoDB URI: ${process.env.MONGO_URI ? "Loaded" : "Not Loaded"}`
      );
    });
  } catch (error) {
    console.error("Failed to connect to DB or start server:", error);
    process.exit(1); // Exit if connection or server startup fails
  }
};

startServer(); // Call the async function to start the server
