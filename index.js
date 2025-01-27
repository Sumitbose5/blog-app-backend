const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware function to parse json data
app.use(express.json());

const blogRoute = require("./routes/blogRoutes")
app.use("/api/v1", blogRoute);

app.listen(PORT, ()=>{
    console.log(`App running successfully at PORT ${PORT}`)
})

// Database Connection
const dbConnect = require("./config/database")
dbConnect();

// Default route
app.get("/", (req, res)=> {
    res.send("<h1> HOME PAGE HEREEE! </h1>")
})