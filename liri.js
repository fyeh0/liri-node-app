require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");

var keys = require("./keys.js");
// var omdb = require('omdb');

// var spotify = new Spotify(keys.spotify);

const userInput = process.argv[2];

var queryUrl =
  "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(function(response) {
  console.log(response.data.Title + " was released in " + response.data.Year);
});

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Who are you?"
    },
    {
      type: "list",
      name: "lookingFor",
      message: "What are you doing here?",
      choices: [
        "I'm looking for a movie",
        "I'm looking for a song",
        "I'm looking for an artist"
      ]
    }
  ])
  .then(function(userInput) {
    if (userInput.choices === "I'm looking for a movie") {
      var queryUrl =
        "http://www.omdbapi.com/?t=" +
        userInput +
        "&y=&plot=short&apikey=trilogy";

      axios
        .get(queryUrl)
        .then(function(response) {
          console.log(
            response.data.Title + " was released in " + response.data.Year
          );
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response);
            console.log("Sorry, I didn't catch that.");
          }
        });
    }
  });
