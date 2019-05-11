require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

const userInput = process.argv[2];