const mongoose = require("mongoose");

module.exports = async (next) => {
    try {
        await mongoose.connect(process.env.DB).then(() => {
            console.log("connected to database.");
            next()
        });
    } catch (error) {
        console.log("could not connect to database", error);
    }
};