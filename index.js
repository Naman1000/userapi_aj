// step 1
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const logger = require("./middleware/logger.middleware");
// const localdburl = "mongodb://localhost:27017/";
const clouddburl = "mongodb+srv://vverma971:HaEnhf14T473RXUs@cluster0.hwin2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const User = require("./models/users.models");
const userRoutes = require("./routes/user.routes");


app.use(express.json());
// step 4
mongoose.connect(clouddburl)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})


app.use(logger);

app.use("/", userRoutes);


//Security 
//Authentication 

//Signup
//Login 



// step 3
app.get("/",(req, res)=>{
    res.send("<h1> Welcome to the User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>")
})

// step 2
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})