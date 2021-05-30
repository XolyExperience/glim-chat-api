// require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routesUsers = require("./routes/users.js");
const routesRooms = require("./routes/rooms.js");

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

app.use("/users", routesUsers);
app.use("/rooms", routesRooms);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
