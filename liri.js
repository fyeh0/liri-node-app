require("dotenv").config();
var fs = require("fs");
var mdash = require("mdash");
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var omdb = require("omdb");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var bandsintown = require("bandsintown"); //("codingbootcamp");

const cmd = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

// Liri logic
function runLiri (command, userIn) {
  switch (command) {
    case "movie-this":
      movieThis(userIn);
      break;
    case "spotify-this": 
      spotifyThis(userIn);
      break;
    case "concert-this":
      concertThis(userIn);
      break;
    case "do-this":
    //   console.log(userIn);
      doThis();
      break;
    default:
      console.log(`
            】 Hi! I'm Liri! 【
        ---------------------------
Please enter one of my following command options!
    
    » spotify-this "song" : to search for a song
    » concert-this "artist" : to search for a concert
    » movie-this "movie" : to search for a movie
        --------------------------`);
      break;
  }
}

function concertThis(userInput) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    userInput +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(`
        ·.¸¸.·♩♪♫  I found this for you!  ♫♪♩·.¸¸.·
        Venue: ${response.data[0].venue.name}
        Location: ${response
          .data[0].venue.city}, ${response.data[0].venue.region}
        Date: ${moment(response.data[0].datetime).format("llll")}`);
    })
    .catch(function(err) {
      if (err) {
        return console.log("Sorry, I didn't catch that.");
      }
    });
}

function movieThis(userInput) {
  if (userInput === "") {
    userInput = "Mr. Nobody";
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
        console.log(`
    ════════════ I found this for you! ════════════
        Title: ${response.data.Title}
        Year: ${response.data.Year}
        IMDB Rating: ${response.data.imdbRating}
        Rotten Tomatoes Rating: ${response.data.Ratings[1]}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Cast: ${response.data.Actors}`);

    //   console.log("Title: " + response.data.Title);
    //   console.log("Year: " + response.data.Year);
    //   console.log("IMDB Rating: " + response.data.imdbRating);
    //   console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1]);
    //   console.log("Country: " + response.data.Country);
    //   console.log("Language: " + response.data.Language);
    //   console.log("Plot: " + response.data.Plot);
    //   console.log("Actors: " + response.data.Actors);
    })
    .catch(function(err) {
      console.log(err.response);
    });
}

function spotifyThis(userInput) {
  if (userInput === "") {
    userInput = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: userInput }, function(err, response) {
    if (err) {
      console.log("Sorry, I didn't catch that. " + err);
    } else {
      console.log(`
          ·.¸¸.·♩♪♫  I found this for you!  ♫♪♩·.¸¸.·
        Song: ${response.tracks.items[0].name}
        Artist: ${response.tracks.items[0].artists[0].name}
        Album: ${response.tracks.items[0].album.name}
        Preview link: ${response.tracks.items[0].href}`);
    }
  })
  return anotherSearch();
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
      var dataArr = data.split(",");
      console.log(dataArr[1].replace('"','').replace('"',''));
      runLiri(dataArr[0].replace('-song',''), dataArr[1].replace('"','').replace('"',''));

      // if () {

      // }
    // console.log("do-this data= ", dataArr);
  });
}

function anotherSearch() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Are you still looking for something?",
                name: "anotherSearch",
            }
        ]).then(function(response) {
            if (response.anotherSearch) {
                console.log("Okay!");
                runLiri();
            } else {
                console.log("¯\_(ツ)_/¯");
                console.log("Okay, bye!");
            }
        })
}

runLiri(cmd, userInput);