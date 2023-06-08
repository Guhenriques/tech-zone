const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");

const products = require("./products");


const app = express();
const port = process.env.PORT || 5000

require("dotenv").config();

const uri = process.env.DB_URI;

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);

// routes
app.get("/", (req, res) => {
  res.send("Server running...")
})

app.get("/products", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(products, null, 2));
})


app.listen(port, console.log(`Server running on port ${port}`))

// core for mongodb connect method
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("MongoDB connection failed", err.message));
