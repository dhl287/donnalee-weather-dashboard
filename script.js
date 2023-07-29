// unique API key
var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('main');
var form = $('#form');
var search = $('#search');
var lat = '';
var lon = '';  
var city = '';

// for (let i = 0; i < 5; i++) {
//   console.log((i * 7) + 1);
// }


// use API to get weather by location, fetch request, current weather
function getCurrentWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`, { mode: "cors" })
      .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        if(respData != null){
        lat = respData.city.coord.lat;
        lon = respData.city.coord.lon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`).then(
          (resp) => resp.json()
        ).then(
          (respData) => {
            console.log(respData)
            addWeatherToPage(respData)
          }
        )
        }
        
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

//use API to get weather by location, fetch request, current day, 5-day weather
// function getFiveWeather() {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
//   .then((resp) => resp.json())
//     .then((respData) => {
//       console.log(respData);
//       addWeatherToPage(respData)
//     })
//     .catch((error) => {
//       console.error("Error occurred:", error);
//     });
// }


  // add weather info to page and HTML, current weather call
      function addWeatherToPage(data){
          // var temp = Ktof(data.main.temp);

          var weather = document.createElement('div')
          weather.classList.add('weather');
          
          weather.innerHTML = `
          <h2>${data.name}</h2>
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${data.main.temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <h4>${data.weather[0].main}</h4>
          <h4>Humidity: ${data.main.humidity}</h4>
          <h4>Wind Speed: ${data.wind.speed}</h4>
          `;

          main.innerHTML= "";
          main.append(weather);
      };

// click search button event
form.on('submit',(event) =>{
  console.log("SUBMIT")
  event.preventDefault();

  city = search.val();
  console.log(city);
    if(city){
      getCurrentWeather()
    }

  });

// get the search history from local storage if available
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// add a search term to the history
function addToSearchHistory() {
  var searchTerm = search.val().trim();

  if (searchTerm !== '') {
    // add the search term to the history
    searchHistory.push(searchTerm);

    // update the local storage with the updated search history
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // clear the search input field
    search.val('');

    // refresh the displayed search history
    displaySearchHistory();
  }
}

// display the search history on the page
function displaySearchHistory() {
  var searchHistoryList = $('#searchHistoryList');

  // clear the existing list
  searchHistoryList.empty();

  // create starting index to display the search history, only show 5 items
  let startIndex = Math.max(0, searchHistory.length - 5);

  // iterate through the search history and create list items (up to 5 items)
  for (let i = startIndex; i < searchHistory.length; i++) {
    var searchTerm = searchHistory[i];
    var listItem = $('<li></li>').text(searchTerm);
    searchHistoryList.append(listItem);
  };
}

// click clearBtn to add search history
$('#clearBtn').on('click', addToSearchHistory);

// display the initial search history when the page loads
displaySearchHistory();

