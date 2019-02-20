require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
//standard and secret api keys for spotify
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var inputString = process.argv;

// Parses the command line argument to capture the "command" (concert-this, spotify-this-song, movie-this, do-what-it-says) and the option
var command = inputString[2];
var option = inputString[3];
 
switch (command) {
    case "concert-this":
        bandIsInTown(option);
        break;
    
    case "spotify-this-song":
        SpotifySearch();
        break;
    
    case "movie-this":
        OMdbSearch()
        break;
    
    case "do-what-it-says":
        doWhatItSays();
        break;
    }

function appendToFile(text) {
    fs.appendFile("log.txt", text, function(err) {
    
        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
      
      });
      
}

function bandIsInTown() {
    var band = "";
    for (var i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
          band = band + "+" + inputString[i];
        }
        else {
          band += inputString[i];
        }
      }
      //if nothing selected default sets it to my brothers band coming to perform at the palace theater this weekend
      if (band === "") band = "Sure Sure";
      inputString+= "\n";
      appendToFile(inputString);
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
    function(response) {
        var time;
        for (var i = 0; i<response.data.length; i++) {
            time = moment(response.data[i].datetime).format('MM/DD/YYYY');
            //Venue name
            console.log("________________________________________");
            console.log(response.data[i].lineup[0] + " is playing at " + response.data[i].venue.name); 
            console.log("Latitude: " + response.data[i].venue.latitude);
            console.log("Longitude: " + response.data[i].venue.longitude);
            console.log(response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log(time);
            console.log("________________________________________");

        }
  }
);
}


function OMdbSearch() {
    var movie = "";
    for (var i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
          movie = movie + "+" + inputString[i];
        }
        else {
          movie += inputString[i];
        }
      }
      inputString+= "\n";
    appendToFile(inputString);
    axios.get("http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("__________________________________")
        console.log(response.data.Title);
        console.log("This movie was released: " + response.data.Released);
        console.log("The movie's IMDB rating is: " + response.data.imdbRating);
        console.log("The movie's rotten tomatoes rating is: " + response.data.Ratings[1].Value);
        console.log("The movie was produced in: " + response.data.Country);
        console.log("The languge of the movie is: " + response.data.Language);
        console.log("The plot of the movie is: " + response.data.Plot);
        console.log("The actors of the movie are: " + response.data.Actors);
        console.log("__________________________________")
  }
);
}

function SpotifySearch() {
    var song = "";
    
    for (var i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
          song = song + "+" + inputString[i];
        }
        else {
          song += inputString[i];
        }
      }
      if (song === "") {
          song = "The Sign Ace of Base";

        }
      spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("__________________________________")
        console.log(data.tracks.items[0].artists[0].name); 
        console.log(data.tracks.items[0].name); 
        console.log("Preview URL: " + data.tracks.items[0].preview_url); 
        console.log("Album: " + data.tracks.items[0].album.name); 
        console.log("Web player: " + data.tracks.items[0].external_urls.spotify);
        console.log("__________________________________")
       
        
      });
}


function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        else {
            switch (inputString) {
                case "concert-this":
                    bandIsInTown(option);
                    break;
                
                case "spotify-this-song":
                    SpotifySearch();
                    break;
                
                case "movie-this":
                    OMdbSearch()
                    break;
            }
        }
        console.log(data);
    });
}
    
    