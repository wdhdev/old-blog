const express = require("express");
const app = express();

require("dotenv").config();

const Sentry = require("@sentry/node");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

Sentry.init({
    dsn: process.env.sentry_dsn,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app }),
        ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
    ],
    tracesSampleRate: 1.0
})

const router = require("./util/router");
const port = process.env.port;

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

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

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
    console.log(`[SERVER] Listening on Port: ${port}`);
})