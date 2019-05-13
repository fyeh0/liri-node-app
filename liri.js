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
var bandsintown = require("bandsintown")("codingbootcamp");

const command = process.argv[2];
const userInput = process.argv[3];

switch (command) {
  case "movie-this":
    movieThis(userInput);
    //   console.log("movieThis");
    console.log(userInput); // result??? define global result var, assign command and userInput to
    break;
  case "spotify-this":
    spotifyThis();
    console.log(response);
    break;
  case "concert-this":
    concertThis();
    console.log(response);
    break;
  default:
    console.log("default");
    break;
}

function concertThis(userInput) {
  bandsintown.getArtistEventList("Skrillex").then(function(events) {});
}

function movieThis(userInput) {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      //   console.log(response.data);
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.imdbRating);
      console.log(response.data.Ratings[1]);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);
    })
    .catch(function (err) {
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
