require("dotenv").config();
var fs = require("fs");
var mdash = require("mdash");
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var omdb = require("omdb");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var bandsintown = require("bandsintown"); //("codingbootcamp");

const command = process.argv[2];
const userInput = process.argv[3];

switch (command) {
  case "movie-this":
    movieThis(userInput);
    break;
  case "spotify-this":
    spotifyThis(userInput);
    break;
  case "concert-this":
    concertThis(userInput);
    console.log("siudghi;seguh");
    break;
  case "do-this":
    doThis();
    break;
  default:
    console.log(`Hi! I'm Liri!
    -------------------
    Please enter one of my following command options!
    
    spotify-this "song" : to search for a song
    concert-this "artist" : to search for a concert
    movie-this "movie" : to search for a movie
    -------------------`);
    break;
}

function concertThis(userInput) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    userInput +
    "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(function(response) {
    console.log(response);
  });
}

function movieThis(userInput) {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1]);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(err) {
      if (err) {
        console.log("inside the err");
        axios
          .get(
            "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy"
          )
          .then(function(response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1]);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
          });
      }
    });
}

function spotifyThis(userInput) {
  axios.get();
  spotify
    .search({ type: "track", query: userInput })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    console.log(data);
  });
}

// inquirer
//     .prompt([
//         {
//             type: "input",
//             message: "Who are you?",
//             name: "name"
//         },
//         {
//             type: "list",
//             message: "What would you like to do?",
//             choices: ["Concert this", "spotify this song", "movie this", "do what it says"],
//             name: "command"
//         }
//     ])
