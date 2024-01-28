const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { selectRandomFile, photoInfo } = require('./helper_functions/picSelector.js');
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: "gryst5u7I1r2fITlEoYREe52NG0nSRbOW4MPi3WL",
});
const { auth } = require('express-openid-connect');
require('dotenv').config();
app.use('/Pics', express.static('./Pics'));

let usedPhoto = "";
let lastPhoto = "";

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

app.get('/curPhoto', (req, res) => {
    res.json({
        url: lastPhoto,
        data: photoInfo[lastPhoto]
    });
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
                lastPhoto = filename;
                res.json({
                    url: filename,
                    data: photoInfo[filename]
                });
            }
        });
    } else {
        let temp = usedPhoto;
        usedPhoto = "";
        res.json({
            url: temp,
            data: photoInfo[temp]
        });
    }
    
});

app.get("/hint", (req, res) => {
    var type = req.query.type;
    var level = req.query.level;
    var hdata = req.query.data;

    var query = "";

    if (type == "loc") {
        query = `Mention a few fun facts about the location in the following coordinates: ${hdata}.`;
    } else if (type == "date") {
        query = `Mention a few fun facts about what happened in: ${hdata}.`;
    } else {
        res.json({"hint": "ERROR! Invalid hint type requested."});
    }

    if (level == "1") {
        query += " Make the response extremely vague so that it is very hard to pinpoint the exact answer. DO NOT MENTION A CITY NAME, YEAR, MONTH OR DATE!";
    } else if (level == "2") {
        query += " Make the response slightly vague so that it is a bit hard to pinpoint the answer. DO NOT MENTION A CITY NAME, YEAR, MONTH OR DATE!";
    } else {
        query += " Make the response mostly strightforward, but DO NOT MENTION A CITY NAME, YEAR, MONTH OR DATE!";
    }

    (async () => {
        const prediction = await cohere.generate({
            prompt: query,
            maxTokens: 100,
        });

        res.json({"hint": prediction["generations"][0]["text"]});
    })();
});

var PORT = process.env.PORT || 8080;

const server = http.Server(app).listen(PORT);

var urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/client"));


