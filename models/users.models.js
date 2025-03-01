const mongoose = require("mongoose");
//import mongoose for managing the data related functions in MongoDB

const bcrypt = require("bcrypt");


//Mongoose Schemas are used for modelling and validating the data that we send to our database
//This helps us in making sure which data is valid and which is not

{/* <input type="number" name="username" id="username" placeholder="Username"> */}


//step 1 : Create a Schema
const userSchema = new mongoose.Schema({
   //We define each key, and add configurations for that specific key, ex : type, required, unique, etc
    username:{
        type : String,
        required : [true, "Username is Required!!!" ],  //if the user does not enter username, the error message will be displayed
        unique :true, //if the user enters a username that already exists, the error message will be displayed
        caseSensitive : [false, "Keep the username in lowercase only"], //if the user enters a username that is case sensitive, the error message will be displayed
        // "Vishoo"->"vishoo" //caseSensitive : false
        trim :[true, "Please Make sure there are no extra spaces"], //if the user enters a username with spaces, the error message will be displayed        
        minLength:[3, "Choose a longer username"],
        maxLength:[10, "Choose a shorter username"] 
   },
   email:{
        type :String,
        required : [true, "Email is Required!!!" ],
        unique :true,
        trim:true,
        match :[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Enter a valid email"],
    },
    password:{
        type :String,
        required:true,
        minLength:[8, "Password should be atleast 8 characters long"],
        maxLength:[20, "Password should be atmost 20 characters long"],
        trim:true
    },
    role:{
        type:String,
        enum:["user", "admin", "super admin"], //enum is used to restrict the values that can be entered in the database
        default:"user" //if the user does not enter a role, the default value will be user
    }
})

userSchema.pre('save', async function(next){

    const user = this;

    try{

        //salt is a string that is added to the password and mixed and a new string is generated
        //that is not easily identified 

        // 1.Encryption Algorithm -cryptographic hash function
        //2 Salt - this is a string that is added to the password and mixed and a new string is generated
        //that is not easily identified

        const salt = await bcrypt.genSalt(10);
        //10 is the number of rounds of hashing that will be done on the password


        const hashedPassword = await bcrypt.hash(user.password, salt); 

        //replace the user password with the hashed password
        user.password = hashedPassword;

        next();

    }
    catch(err){
        console.log(err);
    }

})

userSchema.methods.comparePassword = async function(password){
    const user = this;

    try{
        const result = await bcrypt.compare(password, this.password);

        return result;


    }
    catch(err){
        console.log(err);
    }
}


const User = mongoose.model("User", userSchema);

module.exports = User;
