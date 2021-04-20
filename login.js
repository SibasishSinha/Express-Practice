const EventEmitter = require("events");

// creating a class which can use the fucntionality of the EventEmitter class. All the methods defined inside thte EventEmitter can also be used by the Logger class.

class Logger extends EventEmitter {

    //Define a method inside the class 
    login = (message) => {

        // emitting the "login" event and aslo sending the "message" data
        this.emit("login", message)
}
}


// exporting the logger class.
module.exports = Logger;