const express = require("express");
const server = express();
server.use(express.json());

const Users = require("./data/db.js");

// POST /api/users
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ message: "Please provide name and bio." });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the user."
        });
      });
  }
});

// GET /api/users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting the list of users" });
    });
});

const port = 8000;
server.listen(port, () => console.log("api running"));
