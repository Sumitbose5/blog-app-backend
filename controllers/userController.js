// import the model
const User = require("../models/user");

// create route handler
exports.createUser = async(req, res) => {
    try{
        // fetch the username from req.body
        const { username } = req.body;
        // check if username does not exists in the DB
        const findUser = await User.find({"username" : username});
        // if not exist
        if(findUser.length === 0){
            // create an entry for the newuser
            // craete a new object
            const newuser = new User({username});
            // add it to the user DB
            await newuser.save();

            return res.status(200).json({
                success : true,
                message : `New User Created ${username}`
            })
        }
        else{
            return res.status(500).json({
                success : false,
                message : "User Already Exists!"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}