//Youtube api link
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=the%20hunt%20for%20red%20october&type=video&key=YOUR_API_KEY&videoType=movie&channelId=UCx8ultakVd3KEaLdliOcc9Q

//Wikipedia api link - requires some additional reading for all the rest of it
//https://en.wikipedia.org/w/api.php

//OMDB api link
//http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf


















function searchTrailer(event) {
    event.preventDefault();

    var queryString = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchResults + "trailer&type=video&key=AIzaSyAcMm3fkVwE7lzrz_RxpYrVgltx__OS8T4 &videoType=movie";

    fetch(queryString)
        .then (function (response){
            if(response.ok){
                return response.json();
            }
         })
         .then (function (data) {
            console.log(data);

        var videoSource = data[0].id;
        var source = "https://youtu.be/" + videoSource;
        $("embed").src = source;
         })
}