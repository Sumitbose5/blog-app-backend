// import the mongoose library
const mongoose = require("mongoose");

// create the model for user
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        maxLength : 20
    },

    createdAt : {
        type : Date,
        required : true,
        default : Date.now()
    }
})

// export the schema
module.exports = mongoose.model("User", userSchema);