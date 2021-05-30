const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// Getting all
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getRoom, (req, res) => {
  res.send(res.room);
});

// Creating one
router.post("/", async (req, res) => {
  const room = new Room({
    name: req.body.name,
    users: req.body.users,
  });
  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Updating one
router.patch("/:id", getRoom, async (req, res) => {
  if (req.body.name != null) {
    res.room.name = req.body.name;
  }
  if (req.body.users != null) {
    res.room.users = req.body.users;
  }
  try {
    const updatedRoom = await res.room.save();
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deleting one
router.delete("/:id", getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Deleted room" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRoom(req, res, next) {
  let room;
  try {
    room = await Room.findById(req.params.id);
    if (room == null) {
      return res.status(404).json({ message: "Cannot find room" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.room = room;
  next();
}

module.exports = router;
