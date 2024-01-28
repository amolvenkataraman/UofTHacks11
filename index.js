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

// Generate a hint with Cohere AI
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
