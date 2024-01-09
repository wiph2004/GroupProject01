'use strict';

const api_key='http://www.omdbapi.com/?i=tt3896198&apikey=710f7abf';
const imageBaseURL = ''

const fetchDataFromServer=funcition(url,callback,optionalParam); {
fetch(url)
.then(response=>response.json()).
then(data=>callback(data,optionalParam));
}


export {imageBaseURL,api_key,fetchDataFromServer };
