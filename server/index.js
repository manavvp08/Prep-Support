const express = require("express");
const app = express();
const cors = require("cors");
const Route = require("./routes/routes");
const db = require("./config/dbconfig.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Route);

app.listen(PORT, () => {
  console.log("Server is running...");
});
