//Youtube api link
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=the%20hunt%20for%20red%20october&type=video&key=YOUR_API_KEY&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q

//Wikipedia api link - requires some additional reading for all the rest of it
//https://en.wikipedia.org/w/api.php

//OMDB api link
//http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf

//Rotten tomatoes needs more research and requires approval from them for a link


var searchBtn = document.querySelectorAll('#searchBtn');
var searchBar = document.querySelectorAll('#searchBar');

searchBtn = addEventListener("click", respondClick)

function respondClick() {
    document.getElementById("click").innerHTML;
    var newText = searchBar.value;
    console.log(newText);
}


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





function searchTrailer(event) {
    event.preventDefault();

    var queryString = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchResults + "trailer&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4 &videoType=movie";

    fetch(queryString)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);

            var videoSource = data[0].id;
            var source = "https://youtu.be/" + videoSource;
            $("embed").src = source;
        })
}


