const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database".yellow);

    } catch (error) {
        console.log(`error: ${error.message}`);
    }
}

module.exports = connectDB;