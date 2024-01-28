const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { selectRandomFile } = require('./helper_functions/picSelector.js');
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: "gryst5u7I1r2fITlEoYREe52NG0nSRbOW4MPi3WL",
});
const { auth } = require('express-openid-connect');
require('dotenv').config();
app.use('/Pics', express.static('C:/Users/prana/OneDrive/Desktop/Webdev/UofTHacks11/Pics'));

let usedPhoto = "";

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_CLIENT_SECRET,
    baseURL: 'http://localhost:8080',
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: 'https://dev-1o5n643xup8edfz0.us.auth0.com'
};

app.use(auth(config));
app.use(cors());

app.get('/', (req, res) => {
    res.redirect("http://localhost:5173/");
});

app.get('/newPhoto', (req, res) => {
    if (usedPhoto === "") {
        selectRandomFile().then((filename) => {
            if (!filename) {
                usedPhoto = "";
                res.json({
                    url: "",
                });
            } else {
                usedPhoto = filename;
                res.json({
                    url: filename,
                });
            }
        });
    } else {
        let temp = usedPhoto;
        usedPhoto = "";
        res.json({
            url: temp,
        });
    }
    
});

var PORT = process.env.PORT || 8080;

const server = http.Server(app).listen(PORT);

var urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/client"));


