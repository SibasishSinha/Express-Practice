const config = require("config");
const express = require("express");
const app = express();
// To check for the Node environment in our project. If we don't set it, it will come undefined. 
console.log(`Our Node Env is : ${process.env.NODE_ENV}`);

// to get our app env. By default,ou r app env is set to development
console.log(`Our APP Env is : ${app.get("env")}`);

// Configuration
// using the config package to get details of different settings -
console.log("Application name : " + config.get("name")); // -> to get the name of our applicaiton.
console.log("Mail Host name : " + config.get("mail.host")); // -> To get the deatils of the "host" property defined inside the "mail" property.

console.log("Mail Password : " + config.get("mail.password"));
