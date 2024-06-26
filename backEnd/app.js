const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRoute = require("./Routes/routes");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", mainRoute);

// MongoDB Connection
const url = "mongodb://127.0.0.1:27017/SR_Marketing";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("open", () => {
  console.log("Connected to MongoDB...");
});

// Serving static files from the build folder
app.use(express.static(path.join(__dirname, "build")));

// Handling all other requests by serving the index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Starting the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
