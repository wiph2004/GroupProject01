//Youtube api link
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=the%20hunt%20for%20red%20october&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q

//Wikipedia api link - requires some additional reading for all the rest of it
//https://en.wikipedia.org/w/api.php

//OMDB api link
//http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf

var searchBtn = $('.searchBtn');
var searchForm = $('#searchForm');
var searchBar = document.querySelectorAll('#searchBar');
var searchResults = document.querySelector("#searchBar").value;
var previousSearches = document.querySelector("#previous-searches");
var $previousSearchButtonContainer = $("#previous-searches");
var previousSearch = $("#previousSearch");

var youTubeApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q";
var wikiApi = "https://en.wikipedia.org/w/api.php";
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf";

// var storedSearches = [
//     {
//         movie: " ",
//         trailer: "",
//         movieLoc: "",
//         wiki: "",
//             score: "",
//             synopsis: "",
//         OMDB: "",
//             actor1: "",
//             actor2: ""
//     },
//     {
//         movie: " ",
//         trailer: "",
//         movieLoc: "",
//         wiki: "",
//             score: "",
//             synopsis: "",
//         OMDB: "",
//             actor1: "",
//             actor2: ""
//     },
//     {
//         movie: " ",
//         trailer: "",
//         movieLoc: "",
//         wiki: "",
//             score: "",
//             synopsis: "",
//         OMDB: "",
//             actor1: "",
//             actor2: ""
//     },
//     {
//         movie: " ",
//         trailer: "",
//         movieLoc: "",
//         wiki: "",
//             score: "",
//             synopsis: "",
//         OMDB: "",
//             actor1: "",
//             actor2: ""
//     },
//     {
//         movie: " ",
//         trailer: "",
//         movieLoc: "",
//         wiki: "",
//             score: "",
//             synopsis: "",
//         OMDB: "",
//             actor1: "",
//             actor2: ""
//     },

// ];


// onload:
// - get local storage saved searches
// - render buttons for each previous search

// on submit of search form:
// - add latest search to end of previous searches in local storage
// - get local storage saved searches
// - render buttons for each previous search
// - send fetch to API
// - render movie trailer

var storedSearches = null;

function getStoredSearches() {
    storedSearches = JSON.parse(localStorage.getItem("storedSearches")) || [];
}

function saveStoredSearch(movieTitle) {
    if (storedSearches.length === 5) {
        // remove last search
        storedSearches.pop();
    }
    
    storedSearches.unshift(movieTitle);
    localStorage.setItem("storedSearches", JSON.stringify(storedSearches));
}

window.onload = function recalSearch() {
    getStoredSearches();
    createButtons();
}

searchForm.on("submit", beginSearch);

//event listener for search button
// searchBtn.on("click", respondClick)

function beginSearch(event) {
    event.preventDefault();
    // document.getElementById("#searchBar").value;
    // var newText = searchBar.value;
    // titleSplash.style.display = "none"
    var searchQuery = document.querySelector("#searchBar").value;
    console.log("HELLO?")
    if (searchQuery !== null) {
        console.log(searchQuery);
        searchTrailer(searchQuery);
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

function searchTrailer(query) {
    titleSplash.style.display = "none";
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
                var source = "https://www.youtube.com/embed/" + videoSource;
                $("#embed").attr('src', source);
            }

            // save item to searches
            saveStoredSearch(query);
            // repopulate the array for searches
            getStoredSearches();
            // create buttons
            createButtons();
        })
    // createNewButton(searchResults);
}

function createButtons() {
    $("#previous-searches").empty();
    for (let x = 0; x < storedSearches.length; x++) {
        if (storedSearches[x] === null) {
            break;
        }
        var buttonName = storedSearches[x];
        var newButton = document.createElement("button");
        newButton.textContent = buttonName;
        newButton.setAttribute('data-search', buttonName);
        newButton.classList.add('previousSearchButton');
        previousSearches.appendChild(newButton);
    }
}

function createNewButton(searchResults) {

    for (let index = 0; index < storedSearches.length; index++) {
        $("#previousSearch").remove();
        // var element = document.getElementById("#previousSearch");
        // element.parentNode.removeChild(element);
    }
    console.log("Results: " + searchResults);
    if (JSON.parse(localStorage.getItem("storedSearches") !== null)) {
        storedSearches = JSON.parse(localStorage.getItem("storedSearches"));
        var movieObj = {
            movie: searchResults,
            // trailer: source,
            // movieLoc: movieSource,
            // wiki: wikiSource,
            // score: score,
            // synopsis: wikiSynopsis,
            // OMDB: omdbSource,
            // actor1: actor1Source,
            // actor2: actor2Source,
        }

        storedSearches.splice(0, 0, movieObj);

        for (let x = 0; x < storedSearches.length; x++) {
            if (storedSearches[x] === null) {
                break;
            }
            var buttonName = storedSearches[x].movie;
            var newButton = document.createElement("button");
            newButton.textContent = buttonName;
            newButton.setAttribute('id', previousSearch);                
            previousSearches.appendChild(newButton);
            console.log("New Button");
        }

    } else {

        var movieObj = {
            movie: searchResults,
            // trailer: source,
            // movieLoc: movieSource,
            // wiki: wikiSource,
            // score: score,
            // synopsis: wikiSynopsis,
            // OMDB: omdbSource,
            // actor1: actor1Source,
            // actor2: actor2Source,
        }

        storedSearches.splice(0, 0, movieObj);

        for (let x = 0; x < storedSearches.length; x++) {
            if (storedSearches[x] === null) {
                break;
            }
            var buttonName = storedSearches[x].movie;
            var newButton = document.createElement("button");
            newButton.textContent = buttonName;
            newButton.setAttribute('id', previousSearch);
            previousSearches.appendChild(newButton);
            console.log("Other New buttons");
        }
        localStorage.setItem("storedSearches", JSON.stringify(storedSearches));
    }
}

var searchBtn = document.querySelectorAll('#searchBtn');

function getStoredSearchesOne() {
    var storedSearches = JSON.parse(localStorage.getItem("storedSearches")) || [];

    //retrieve variables 
    storedSearches.forEach(function (search) {
        console.log("Movie:", search.movie);
        console.log("Trailer:", search.trailer);
        console.log("Movie Location:", search.movieLoc);
        console.log("Score:", search.score);
        console.log("Synopsis:", search.wikiSynopsis);
        console.log("OMDB;", search.omdbSource);
        console.log("Actor1:", search.actor1Source);
        console.log("Actor2", search.actor2Source);
    });
    createNewButton();
}
//call the stored searches 
// getStoredSearches();

$previousSearchButtonContainer.on("click", "button", usePreviousSearch);
//use a button to redo a search
function usePreviousSearch(event) {
    var newSearch = event.target.textContent;
    console.log(newSearch);
    searchTrailer(newSearch);
}


//potential wikipedia function 
//function wikiPage(queryWiki) {
// event.preventDefault();

//var queryString = "https://en.wikipedia.org/w/api.php";

//fetch(queryStringWiki)
//.then(function (response) {
//if (response.ok) {
//return response.json();
//}
//})
//.then(function (data) {
//console.log(data);

//var videoSource = data?.items?.[0]?.id?.videoId;

//if (wikiSource) {
//console.log("HAVE VIDEO SOURCE", wikiSource);
//var source = "https://api.wikimedia.org/feed/v1/wikipedia/en/featured" + wikiSource;
//$("#embed").attr('src', source);
//}
//})
//}


