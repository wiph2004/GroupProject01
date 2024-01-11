//Youtube api link
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=the%20hunt%20for%20red%20october&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q

//Wikipedia api link - requires some additional reading for all the rest of it
//https://en.wikipedia.org/w/api.php

//OMDB api link
//http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf




var searchBtn = $('.searchBtn');
var searchBar = document.querySelectorAll('#searchBar');
var searchResults = document.querySelector("#searchBar").value;
var previousSearches = $("#previous-searches");

searchBtn.on("click", respondClick)

var youTubeApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q";
var wikiApi = "https://en.wikipedia.org/w/api.php";
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf";


//event listener for search button



function respondClick() {
    // document.getElementById("#searchBar").value;
    // var newText = searchBar.value;
    titleSplash.style.display = "none";
    searchResults = document.querySelector("#searchBar").value;
    console.log("HELLO?")
    if (searchResults !== null){
        console.log(searchResults);
        searchTrailer(searchResults);
    }
}

//extract info from input 
function extractContent(s, space) {
    var span = document.createElement('span');
    span.innerHTML = s;
    if (space) {
        var children = span.querySelectorAll('*');
        for (var i = 0; i < children.length; i++) {
            if (children[i].textContent)
                children[i].textContent += ' ';
            else
                children[i].innerText += ' ';
        }
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g, ' ');
};

var storedSearches = [
    {
        movie: " ",
        trailer: "",
        movieLoc: "",
        wiki: "",
            score: "",
            synopsis: "",
        OMDB: "",
            actor1: "",
            actor2: ""
    },
    {
        movie: " ",
        trailer: "",
        movieLoc: "",
        wiki: "",
            score: "",
            synopsis: "",
        OMDB: "",
            actor1: "",
            actor2: ""
    },
    {
        movie: " ",
        trailer: "",
        movieLoc: "",
        wiki: "",
            score: "",
            synopsis: "",
        OMDB: "",
            actor1: "",
            actor2: ""
    },
    {
        movie: " ",
        trailer: "",
        movieLoc: "",
        wiki: "",
            score: "",
            synopsis: "",
        OMDB: "",
            actor1: "",
            actor2: ""
    },
    {
        movie: " ",
        trailer: "",
        movieLoc: "",
        wiki: "",
            score: "",
            synopsis: "",
        OMDB: "",
            actor1: "",
            actor2: ""
    },

];

window.onload = function recalSearch(){
    if (JSON.parse(localStorage.getItem("storedSearches") !== null)){
        createButton();
    }


}


function searchTrailer(query) {
    // event.preventDefault();

    var queryString = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + query + "trailer&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie";

    fetch(queryString)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);

            var videoSource = data?.items?.[0]?.id?.videoId;

            if (videoSource) {
                console.log("HAVE VIDEO SOURCE", videoSource);
                var source = "https://youtu.be/" + videoSource;
                $("#embed").attr('src', source);
            }
        })
}

function createButton(){
    for (let x = 0; x < storedSearches.length; index++) {
        if (storedSearches[x] === null) {
            break;
        }
        var buttonName = storedSearches[x].movie;
        var newButton = document.createElement("button").attr('name', buttonName);
        newButton.textContent = buttonName;
        previousSearches.appendChild(newButton);
    }
}




function createButton() {
    for (let x = 0; x < array.length; index++) {
        if (storedSearches[x] === null) {
            break;
        }
        var buttonName = storedSearches[x].movie;
        var newButton = document.createElement("button").attr('name', buttonName);
        newButton.textContent = buttonName;
        previousSearches.appendChild(newButton);
    }
}

function createNewButton() {

    if (JSON.parse(localStorage.getItem("storedSearches") !== null)) {
        storedSearches = JSON.parse(localStorage.getItem("storedSearches"));
        var movieObj = {
            movie: searchResults,
            trailer: source,
            movieLoc: movieSource,
            wiki: wikiSource,
            score: score,
            synopsis: wikiSynopsis,
            OMDB: omdbSource,
            actor1: actor1Source,
            actor2: actor2Source,
        }

        storedSearches.splice(0, 0, movieObj);

        for (let x = 0; x < array.length; index++) {
            if (storedSearches[x] === null) {
                break;
            }
            var buttonName = storedSearches[x].movie;
            var newButton = document.createElement("button").attr('name', buttonName);
            newButton.textContent = buttonName;
            previousSearches.appendChild(newButton);
        }
        
    }

    else{

        var movieObj = {
        movie: searchResults,
        trailer: source,
        movieLoc: movieSource,
        wiki: wikiSource,
        score: score,
        synopsis: wikiSynopsis,
        OMDB: omdbSource,
        actor1: actor1Source,
        actor2: actor2Source,
    }

    storedSearches.splice(0, 0, movieObj);

    for (let x = 0; x < storedSearches.length; index++) {
        if (storedSearches[x] === null) {
            break;
        }
        var buttonName = storedSearches[x].movie;
        var newButton = document.createElement("button").attr('name', buttonName);
        newButton.textContent = buttonName;
        previousSearches.appendChild(newButton);
    }
        localStorage.setItem("storedSearches", JSON.stringify(storedSearches));
}}

var searchBtn = document.querySelectorAll('#searchBtn');

function getStoredSearches() {
    var storedSearches = JSON.parse(localStorage.getItem("storedSearches")) || [];

    //retrieve variables 
    storedSearches.forEach(function(search) {
        console.log("Movie:", search.movie);
        console.log("Trailer:", search.trailer);
        console.log("Movie Location:", search.movieLoc);
        console.log("Score:", search.score);
        console.log("Synopsis:", search.wikiSynopsis);
        console.log("OMDB;", search.omdbSource);
        console.log("Actor1:", search.actor1Source);
        console.log("Actor2", search.actor2Source);
    });
}
//call the stored searches 
getStoredSearches();



