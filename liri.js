require("dotenv").config();
var fs = require("fs");
var mdash = require("mdash");
// var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var omdb = require("omdb");
var moment = require("moment");
// moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var bandsintown = require("bandsintown"); //("codingbootcamp");

const command = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

// Liri logic
switch (command) {
  case "movie-this":
    movieThis(userInput);
    break;
  case "spotify-this":
    spotifyThis(userInput);
    break;
  case "concert-this":
    concertThis(userInput);
    break;
  case "do-this":
    doThis();
    break;
  default:
    console.log(`
       Hi! I'm Liri!
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

  bandsintown
    .getArtist(queryUrl)
    .then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
      console.log(response.data.vanue.name);
      console.log(response.data.venue.city);
      console.log("concert stuff here");
        }
    })
    .catch(function(err) {
      if (err) {
        return console.log("Sorry, I didn't catch that.");
      }
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
            console.log(err.response);
          });
      }
    });
}

function spotifyThis(userInput) {
  spotify
    .search({ type: "track", query: userInput }, function(err, response) {
        if(err) {
            console.log("oops" + err);
        } else {
            console.log(`
            ·.¸¸.·♩♪♫ I found this for you! ♫♪♩·.¸¸.·
        Song: ${response.tracks.items[0].name}
        Artist: ${response.tracks.items[0].artists[0].name}
        Album: ${response.tracks.items[0].album.name}
        Preview link: ${response.tracks.items[0].href}`)
            // console.log("Song: " + response.tracks.items[0].name); //song name
            // console.log("Artist: " + response.tracks.items[0].artists[0].name); // artist name
            // console.log("Album: " + response.tracks.items[0].album.name); //album name
            // console.log("Preview link: " + response.tracks.items[0].href); //preview link
        }
    })
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    console.log(data);
  });
}
