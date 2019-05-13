require("dotenv").config();
var fs = require("fs");
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var omdb = require("omdb");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const userInput = process.argv[2];

switch (command) {
  case movieThis():
    console.log(response);
    break;
  case spotifyThis():
    console.log(response);
    break;
  default:
    console.log("default");
}

function concertThis(userInput) {}

function movieThis() {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(err) {
      if (err === "") {
        axios
          .get(
            "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy"
          )
          .then(function(response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
          });
      }
    });
  // fs.readFile("random.txt", "utf8", function(err, data) {
  //     if (err) {
  //         return console.log(err);
  //     }
  // });
}

function spotifyThis() {
  spotify.search({ type: "track", query: "All the Small Things" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    console.log(data);
  });
}

// fs.writeFile("random.txt", userInput, err); {
// if (err) {
//     return console.log(response.data.err);
//     } else {
//     console.log(response.data);
//     console.log(response.data.Title);
//     console.log(response.data.Year);
//     console.log(response.data.Rated);
//     console.log(response.data.Rating);
//     console.log(response.data.Plot);
//     console.log(response.data.Actors);
// }
// }

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
