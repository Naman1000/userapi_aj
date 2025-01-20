const express = require("express");
const User = require("../models/users.models");


const router = express.Router();


//Querying the database
router.get("/users", async (req, res)=>{
    
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



router.post("/users/", async (req, res)=>{

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