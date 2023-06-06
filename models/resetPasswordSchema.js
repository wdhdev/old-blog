const mongoose = require("mongoose");
const moment = require("moment");
const cron = require("node-cron");

const schema = new mongoose.Schema({
    _id: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

schema.virtual("expiresAt").get(function () {
    return moment(this.createdAt).add(30, "minutes").toDate();
})

const model = mongoose.model("password-resets", schema, "password-resets");

// Schedule a cron job to delete expired documents every minute
cron.schedule("* * * * *", async () => {
    const currentDate = new Date();
    const expiredDocuments = await model.find({ expiresAt: { $lte: currentDate } });

    if(expiredDocuments.length > 0) {
        await model.deleteMany({ expiresAt: { $lte: currentDate } });
        console.log(`[DATABASE] (resetPasswordSchema): Deleted ${expiredDocuments.length} expired documents.`);
    }
})

module.exports = model;
