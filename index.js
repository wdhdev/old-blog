const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

require("dotenv").config();

const router = require("./util/router");
const port = process.env.port;

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}))

// Host public files
app.use(express.static(__dirname + "/public"));

// Connect to Database
const database = require("./util/database");
database();

app.use("/", router);

app.listen(port, () => {
    console.log(`[SERVER] Listening on Port: ${port}`);
})