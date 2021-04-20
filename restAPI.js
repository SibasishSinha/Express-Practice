// building our first server using express
const Joi = require('joi');
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const names = [
    { id : 1, name : "AA" },
    { id : 2, name : "BB"},
    { id : 3, name : "CC" }
]

app.use(express.json()); // Using middlewares to parse the sent data into JSON

app.get("/", (req,res) =>{
    res.write("Hi")
    res.write("Hello Again !")
    res.end()
}) 

// setting up request parameters 
app.get("/api/posts/:number/:likes", (req,res)=>{
    res.send(req.params);
})

app.get("/names", (req,res)=>{
    res.send(names);
})

// handling POST requests and validating user input

app.post("/api/names/", (req,res)=>{

    // validating using Joi package
    // Define a schema of what kind of object we are going to POST and wht are the properties of that object

    const schema = Joi.object({
        // id : Joi.number().required(),
        name : Joi.string().min(3).required() // It should be a string, have minimum 3 characters and is required
    });

    // Validate the user input according to the defined schema
    // This method returns an object.
    const result = schema.validate(req.body)
    
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const n = {
        id : names.length + 1,
        name : req.body.name 
    }
    
    names.push(n);
    res.send(n); 
})

// handling HTTP GET requests
app.get("/api/names/:id", (req,res)=>{
    // Find a name among the "names" array of the person whose id matches with the id requested by the user. IF the id's dont match, an error message will be displayed
    const result = names.find(name => name.id === parseInt(req.params.id));
    // If the name is found, send the name with ID, and if not, display an error message with 404 status code
    if (result){
        res.status(200).send(result)
    } else {
        res.status(404).send("The ID you are searching is not found !")
    }
})

// Updating a name using PUT request
// We need id parameter because id is an unique field. 
app.put("/api/names/:id", (req,res)=>{
    // Look up for the searched id
    const result = names.find(name => name.id === parseInt(req.params.id));
    // If i doesnt exist, return 404 page
    if(!result) { res.status(404).send("The ID you are searching is not found !") }
    // Validate the user input
    const val = Joi.object({
        name : Joi.string().min(3).required()
    });
    const ans = val.validate(req.body);
    // If invalid, return 400
    if(ans.error){
        res.status(400).send(result.error.details[0].message)
    }

    // Update the name and send it back
    result.name = req.body.name;
    res.send(result);
})

// HTTP delete request
app.delete("/api/names/:id", (req,res)=>{
    // Look for the searched name id
    const result = names.find( name => name.id === parseInt(req.params.id))
    // if it doesnt exist, send an 404 page
    if(!result){
        res.status(404).send("Id you have requested cannot be found !");
        return;
    }
    // delete the request id
    // to delete the name, we need first find the index of the name the user has requested.
    const index = names.indexOf(result);
    names.splice(index, 1);

    // return the course that was delete
    res.send(result)
})


app.listen(port, () => console.log(`Listening to port ${port}`));