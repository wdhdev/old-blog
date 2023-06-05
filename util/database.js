const expirePasswordResets = require("./expirePasswordResets");

try {
    const mongoose = require("mongoose");

    require("dotenv").config();

    module.exports = async () => {
        mongoose.connect(process.env.database, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("[DATABASE] Connected to MongoDB!");
        }).catch(err => {
            console.error(err);
            process.exit(1);
        })
    }

    // Expire password resets
    expirePasswordResets();
    setInterval(expirePasswordResets, 60 * 1000);
} catch(err) {
    console.error(err);
    process.exit(1);
}