const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const socketIo = require("socket.io");

app.use(cors());

var PORT = process.env.PORT || 8080;

const server = http.Server(app).listen(PORT);
var io = socketIo(server);

var urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
    res.json({
        message:"Message has been received"
    });
});

io.sockets.on("connection", (socket) => {
    console.log("Connection established: " + socket.id);
  
});
