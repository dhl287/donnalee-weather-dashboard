var requestUrl = 'https://api.github.com/repos/twitter/chill/issues?per_page=5';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Github Repo Issues \n----------');
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].url);
      console.log(data[i].user.login);
    }
  });

var APIKey = '572661e61377e7d7c006042ef76c9263';

var city;

var state;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// EXAMPLE: 
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

fetch(queryURL)
