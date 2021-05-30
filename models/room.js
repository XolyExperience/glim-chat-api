const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
  },
});

module.exports = mongoose.model("Room", roomSchema);
