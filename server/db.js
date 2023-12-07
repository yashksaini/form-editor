// db.js

const mongoose = require("mongoose");

// MongoDB connection URL
const mongoURI =
  "mongodb+srv://yashdms1:o7oTvW2uysDE5XVW@cluster0.vto2oum.mongodb.net/form-builder?retryWrites=true&w=majority"; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for successful connection and error
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB", err);
});
