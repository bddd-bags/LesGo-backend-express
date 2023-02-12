require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

// setup server
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use router
app.use(router);

// run server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
