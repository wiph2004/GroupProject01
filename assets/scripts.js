var searchBtn = $('.searchBtn');
var searchForm = $('#searchForm');
var searchBar = document.querySelectorAll('#searchBar');
var searchResults = document.querySelector("#searchBar").value;
var previousSearches = document.querySelector("#previous-searches");
var $previousSearchButtonContainer = $("#previous-searches");
var movieInfo = document.querySelector("#movie-info");
var previousSearch = $("#previousSearch");
var isPreviousSearch = false;
var movieContainer = document.getElementById("movie-container");
var movieInfo = document.getElementById("movie-info");

var youTubeApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q";
var wikiApi = "https://en.wikipedia.org/w/api.php";
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf";

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
    movieContainer.style.display = "block";
    movieInfo.style.display = "block";

    var searchQuery = document.querySelector("#searchBar").value;
    console.log("HELLO?")
    if (searchQuery !== null) {
        console.log(searchQuery);
        searchTrailer(searchQuery);
    }
}

function searchTrailer(query) {
    titleSplash.style.display = "none";
    movieContainer.style.display = "block";
    movieInfo.style.display = "block";
    
    const URL="https://omdbapi.com/?t=" + query +"&page=1&apikey=710f7abf";

    fetch(URL)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (data) {
        console.log(data);
        movieInfo.textContent = "";
        var movieTitle = data.Title;
        var plot = data.Plot;
        var rating01 = data.Ratings[0].Value;
        var rating02 = data.Ratings[1].Value;
        var rating03 = data.Ratings[2].Value;
        var poster = data.Poster;
        var runtime = data.Runtime;
        var releaseDate = data.Released;
        var actors = data.Actors;
        console.log(movieTitle, plot, rating01);
        // var pEl = document.createElement("p");
        // pEl.textContent = (movieTitle + "/Runtime: " + runtime + ". Starring: " + actors + ". " + plot + " IMDb Rating: "+ rating01 + ".");
        // movieInfo.appendChild(pEl);
        var titleRuntimePEl = document.createElement("p");
        var starringPEl = document.createElement("p");
        var synopsisPEl = document.createElement("p");
        var ratingPEl = document.createElement("p");
        titleRuntimePEl.textContent = (movieTitle + "/Runtime: " + runtime);
        starringPEl.textContent = ("Starring: " + actors + ".");
        synopsisPEl.textContent = (plot);
        ratingPEl.textContent = ("IMDb Rating: " + rating01);
        movieInfo.appendChild(titleRuntimePEl);
        movieInfo.appendChild(starringPEl);
        movieInfo.appendChild(synopsisPEl);
        movieInfo.appendChild(ratingPEl);
    })

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

