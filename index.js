const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const socketIo = require("socket.io");


var PORT = process.env.PORT || 8080;

const server = http.Server(app).listen(PORT);
var io = socketIo(server);

var urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {

});

io.sockets.on("connection", (socket) => {
    console.log("Connection established: " + socket.id);
  
});
