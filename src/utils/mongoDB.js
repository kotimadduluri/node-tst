const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB).then(() => {
            console.log("connected to database.");
        });
    } catch (error) {
        console.log("could not connect to database", error);
    }
};