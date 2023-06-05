const schema = require("../models/resetPasswordSchema");

module.exports = async function () {
    for(const document of await schema.find().clone()) {
        if(Date.now() >= document.expires) {
            await document.delete();

            console.log(`[DATABASE] Password Reset Expired: ${document._id}`);
        }
    }
}