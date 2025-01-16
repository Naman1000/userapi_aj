// Error Handling
//To track the issues in our code 
//Our Servers need to be always online and running
//Servers are called by multiple clients at a time

// Scalabality is very important for our servers
// Because of one error, our server should not go down-> Servers should be fault tolerant
//Error Handling 


const logger = (req, res, next)=>{

    try{
        console.log(`Request URL: ${req.url} Request Method: ${req.method} Request Time: ${new Date().toString()}`);
        console.log("Hello hello whatsup")
        next();

    }
    // if there is an error, we need to catch it 
    catch(err){
        console.log(err);
    }


}

module.exports = logger;