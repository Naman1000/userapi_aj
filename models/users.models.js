const mongoose = require("mongoose")


//Mongoose Schemas are used for modelling and validating the data that we send to our database
//This helps us in authenticating which data is valid and which is not

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    password: String
})

const User = mongoose.model("User", userSchema);

module.exports = User;
