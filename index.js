const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { selectRandomFile } = require('./helper_functions/picSelector.js');

app.use(cors());

var PORT = process.env.PORT || 8080;

const server = http.Server(app).listen(PORT);

var urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
    selectRandomFile().then((filename) => {
        if (!filename) {
            res.json({
                url: "",
            });
        } else {
            res.json({
                url: filename,
            });
        }
    });
});
