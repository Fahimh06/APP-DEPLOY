require("dns").setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());



// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});



// REGISTER TEST ROUTE
app.post("/api/auth/register", (req, res) => {

  console.log(req.body);

  res.json({
    message: "Register API Working",
  });

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});