const http = require("http");

const server = http.createServer( (req, res) =>{
    res.write("Hello World !!")
    res.end()
} ); // -> This "server" object is an event emitter. It has all the methods of the EventListener ( net.Server, which is used to create a TCP or IPC sever)


// Emit an event
server.listen(3000, ()=> {
    console.log("Listening to port 3000");
})