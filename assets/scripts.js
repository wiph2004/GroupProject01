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
var isPreviousSearch = false;

var youTubeApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q";
var wikiApi = "https://en.wikipedia.org/w/api.php";
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf";

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

function beginSearch(event) {
    event.preventDefault();
    isPreviousSearch = false;

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
    // var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=revision&formatversion=2&rvprop=content&rvslots=*&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='" + query + "'";
    //  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=" + query + "&formatversion=2&rvprop=content&rvslots=*"
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', wikiUrl, true);
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.onload = function() {
    //     var data = JSON.parse(this.response);
    //     console.log(data);
    //     console.log(data.query.pages);
    //     for (var pageId in data.query.pages) {
    //         console.log(data.query.pages[pageId].title);
    //     }
    // };
    // xhr.send();


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
            if (isPreviousSearch === false) {
                createButtons();
            }
 })
    
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

var searchBtn = document.querySelectorAll('#searchBtn');

$previousSearchButtonContainer.on("click", "button", usePreviousSearch);
//use a button to redo a search
function usePreviousSearch(event) {
    var newSearch = event.target.textContent;
    isPreviousSearch = true;
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


