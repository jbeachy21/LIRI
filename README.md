# LIRI

## Overview
LIRI is a Node.js command-line assistant that executes simple text commands to retrieve information from external APIs. It routes user input to different services (concerts, movies, and music) and formats the results for quick terminal output.

## Features
- Look up upcoming concerts for an artist
- Retrieve movie details and ratings
- Search for song information via Spotify
- Execute commands from a file

## Tech Stack
- Node.js
- JavaScript
- Axios
- dotenv
- Command-line interface (CLI)

## Commands
```bash
node liri.js concert-this <artist>
node liri.js movie-this <movie>
node liri.js spotify-this-song <song>
node liri.js do-what-it-says


## Demo

### Concert Lookup
![Concert Demo](./ScreenCapture/concert_this_default.gif)

![Concert Demo](./ScreenCapture/concert_this.gif)

### Movie Lookup
![Movie Demo](./ScreenCapture/movie_this_default.gif)

![Movie Demo](./ScreenCapture/movie_this.gif)

### Spotify Search
![Spotify Demo](./ScreenCapture/spotify_this_default.gif)

![Spotify Demo](./ScreenCapture/spotify_this.gif)


