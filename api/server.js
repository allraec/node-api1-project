// BUILD YOUR SERVER HERE
const express = require("express");
const db = require("./users/model");
const server = express();

server.use(express.json());

//Endpoint that returns an array of users.
server.get("/api/users", (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        });
});

//Endpoint that lets user create a new user object and returns object with id.
server.post("/api/users", (req, res) => {

    if(req.body.name == null || req.body.bio == null){
        res.status(400).json({ message: "Please provide name and bio for the user" });
    }else{
        db.insert({name: req.body.name, bio: req.body.bio})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        });
    }
});

//Endpoint that returns a user object with the specified id.
server.get("/api/users/:id", (req, res) => {

    db.findById(req.params.id)
        .then(user => {
            if(user == null){
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            }else{
                res.json(user);
            }
        })
        .catch(() => {
            res.status(404).json({ message: "The user information could not be retrieved" });
        });
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
