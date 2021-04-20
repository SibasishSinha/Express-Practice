// const log = require("./logger"); // requiring the logger module into the log object and using all the methods and functions inside the module.

// log.logger("Hello bhai !")
// console.log(log.url); 

const Logger = require("./login"); // Importing the class
const EventEmitter = require("events");

// creating an instance of the imported class
const logger = new Logger();

// in login.js, since the Logger class is extending the methods of EventEmitter class, we can use those methods. 
// Here, after importing the Logger class from login.js, we are creating an instance of the Logger class as logger. 
// We can use all the methods of EventEmitter via logger object.
// Listening to the emitted "login" event from lgon.js
logger.on("login", (msg)=>{
    console.log("Logged", msg);
})


// Calling the login() method defined inside the Logger class and passing a message.
logger.login("This is the message to be logged !")