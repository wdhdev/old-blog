const mongoose = require("mongoose");
const Sentry = require("@sentry/node");

require("dotenv").config();

module.exports = async () => {
    // Supress Deprecation Warning
    mongoose.set("strictQuery", true);

    return mongoose.connect(process.env.database, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to Database!");
    }).catch(err => {
        Sentry.captureException(err);
        console.error(err);

        process.exit(1);
    })
}
