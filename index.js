const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const userController = require("./userController");
const achController = require("./achController");

const app = express();
app.use(bodyParser.json());

// User
app.post("/api/user/createuser", userController.createUsers);
app.post("/api/user/getuser", userController.getUser);
app.get("/api/user/getallusers", userController.getAllUser);
// ACH
app.post("/api/users/:userId/createnode", achController.createNode);
app.get("/api/users/:userId/getallnodes", achController.getAllNodes);
app.get("/api/users/:userId/getusertrans", achController.getUserTransactions);
app.post("/api/users/:userId/createtrans", achController.createTransaction);

app.use(express.static(`./build`));

const SERVER_PORT = 4000;
app.listen(SERVER_PORT, () => {
  console.log(`Tuning into Port ${SERVER_PORT} 📡`);
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile("./build/index.html");
});
