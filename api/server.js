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
    })
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
