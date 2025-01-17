// step 1
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const logger = require("./middleware/logger.middleware");
const localdburl = "mongodb://localhost:27017/users";
const clouddburl = "mongodb+srv://vverma971:HaEnhf14T473RXUs@cluster0.hwin2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const User = require("./models/users.models");

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


//Querying the database
app.get("/users", (req, res)=>{
    res.send("All Users");
})

app.get("/users/:id", (req, res)=>{
    res.send(`Single User with id: ${req.params.id}`);
})


//Create documents

app.post("/users/:id", async (req, res)=>{

    const user = req.body;

    try{
        const addeduser = await User.create(user);
      
        res.send(`Create User with id: ${addeduser}`);
    
    }

    catch(err){
        console.log(err);
    }

})
  

//Update documents

app.put("/users/:id", (req, res)=>{
    res.send(`Update User with id: ${req.params.id}`);
})


//Delete Documents

app.delete("/users/:id", (req, res)=>{
    res.send(`Delete User with id: ${req.params.id}`);
});

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