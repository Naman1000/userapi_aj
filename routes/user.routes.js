const express = require("express");
const User = require("../models/users.models");
const { generateToken, auth } = require("../middleware/auth");


const router = express.Router();


//Querying the database
//protected route
router.get("/users", auth,async (req, res)=>{
    
    try{
        const users = await User.find();
        //db.users.find();
        res.send(users);
    }
    catch(err){
        console.log(err);
    }

})

router.get("/users/:id", async (req, res)=>{
   
    try{
        const user = await User.findById(req.params.id);
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
})


//Create documents


//sign up route 
router.post("/users/signup", async (req, res)=>{

    const user = req.body;

    try{
        const addeduser = await User.create(user);
        
        //this payload would be extracted while signing up the user
        //payload would be used to identify the api calls made by this user

        const payload = {
            email: user.email,
        }

        const token = await generateToken(payload);
        

        res.send(`Create User with id: ${addeduser}, token: ${token}`);
    
    }

    catch(err){
        console.log(err);
    }

})

//Login route

router.post("/users/login", async (req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email:email});

        if(!user){
            res.send("User does not exist");

        }

        const token = await generateToken({email: user.email});

        const isValid = await user.comparePassword(password);
            
            if(!isValid){
                res.status(400).send("Password is incorrect");
            }
            else{
                res.send("User is logged in")
            }
        }

    
    catch(err){
        console.log(err);

    }
})



  

//Update documents

router.put("/users/:id", (req, res)=>{
    res.send(`Update User with id: ${req.params.id}`);
})


//Delete Documents

router.delete("/users/:id", async (req, res)=>{
    
    try{
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        res.send(`Delete User with id: ${deleteduser}`);
    }
    catch(err){
        console.log(err);
    }

});


module.exports = router;