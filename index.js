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

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "This user ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user was not found." });
    });
});

// DELETE /api/users/:id
server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "The user was deleted."
        });
      } else {
        res.status(404).json({ message: "This user ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

// PUT /api/users/:id
server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ message: "Please provide name and bio." });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "This user ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          message: "The user information could not be modified."
        });
      });
  }
});

const port = 8000;
server.listen(port, () => console.log("api running"));
