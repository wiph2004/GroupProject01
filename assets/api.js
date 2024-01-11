const api_key='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTE4OWExOTBlYWRlZjNmOWZhYTMyZGJlMzRjMzdkNCIsInN1YiI6IjY1OWYzYTFiY2U0ZGRjMDFhNTU2MWZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Yurp8mk1k1oSDDeI4FrV-ng1FYHIl1r9daJI-vRYWE';
const imageBaseURL = '"https://image.tmdb.org/t/p/"'

const fetchDataFromServer=function(url,callback,optionalParam) {
    fetch(url)
    .then(response=>response.json())
    .then(data=>callback(data,optionalParam));
}

// This is for ES6 modules, which we are not using yet
// export { imageBaseURL, api_key, fetchDataFromServer };
