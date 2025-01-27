const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to Database Successfully"))
    .catch((err) => console.log("Database Connection failed", err))
}

module.exports = dbConnect;