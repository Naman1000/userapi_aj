// step 1
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const logger = require("./middleware/logger.middleware");
const localdburl = "mongodb://localhost:27017/users";



// step 4
mongoose.connect(localdburl, 
    {
    useNewUrlParser: true, // to avoid deprecation warnings and allow dynamic routing
    useUnifiedTopology: true //it makes it convenient for our application to parse through different layers of db
})
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})


//Querying the database
app.get("/users", (req, res)=>{
    res.send("All Users");
})

app.get("/users/:id", (req, res)=>{
    res.send(`Single User with id: ${req.params.id}`);
})


//Create documents

app.post("/users/:id", (req, res)=>{
    res.send(`Create User with id: ${req.params.id}`);
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


app.use(logger);

// step 3
app.get("/",(req, res)=>{
    res.send("<h1> Welcome to the User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>")
})

// step 2
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})