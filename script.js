// unique API key
var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('main');
var five = $('.five');
var form = $('#form');
var search = $('#search');
var searchBtn = $('#searchBtn');
var lat = '';
var lon = '';  
var city = '';

// for (let i = 0; i < 5; i++) {
//   const element = array[index];
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

// use API to get weather by location, fetch request, current day, 5-day weather
function getFiveWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
  .then((resp) => resp.json())
    .then((respData) => {
      console.log(respData);
      renderFive(respData);
})

    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// display 5-day forecast
function renderFive(weatherArray) {
  var dayOne = dayjs().add(1, 'day').startOf('day').unix();
  var dayFive = dayjs().add(6, 'day').startOf('day').unix();
  var displayFive = document.createElement('div');
  var displayFiveSize = document.createElement('h4');
  var weatherArray = data.list;

  displayFive.setAttribute('class', 'col-12');
  displayFiveSize.textContent = '5-Day Forecast: ';
  displayFive.append(displayFiveSize);

  for (var i = 0; i < weatherArray.length; i++) {
    if (weatherArray[i].dt >= dayOne && weatherArray[i].dt < dayFive) {

      if (weatherArray[i].dt_txt.slice(11, 13) == "12") {
        console.log(weatherArray[i]);
        
      }
    }
  }
  addWeatherToPage();
};


  // add weather info to page and HTML, current weather call
      function addWeatherToPage(data){

          var weather = document.createElement('div')
          weather.classList.add('weather');
          
          weather.innerHTML = `
          <h2>${data.name}</h2>
          <h2>Current Weather</h2>
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" id="icon" /> ${data.main.temp}°F </h2>
          <h4>${data.weather[0].main}</h4>
          <h4>Humidity: ${data.main.humidity}</h4>
          <h4>Wind Speed: ${data.wind.speed}</h4>
          `;

          main.innerHTML= "";
          main.append(weather);
      };

        // add weather info to page and HTML, current weather call, 5-day
      //   function addWeatherToPageFive(data){

      //     var weatherFive = document.createElement('div')
      //     weatherFive.classList.add('weatherFive');
          
      //     if (weatherArray[i].dt_txt === 1690977600) {
      //     weatherFive.innerHTML = `
      //     <h2>${data.name}</h2>
      //     <h2>Current Weather</h2>
      //     <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" id="icon" /> ${data.main.temp}°F </h2>
      //     <h4>${data.weather[0].main}</h4>
      //     <h4>Humidity: ${data.main.humidity}</h4>
      //     <h4>Wind Speed: ${data.wind.speed}</h4>
      //     `;

      //     five.innerHTML= "";
      //     five.append(weather);
      //   }
      // };


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

  // clear weather results function, will be added to click clear button event
  function clearWeatherResults () {
    $(".weather").html("");
    addToSearchHistory();

  }

  // click clear button event
  $("#clearBtn").on('click', function(event) {
    event.preventDefault();
    clearWeatherResults();
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
    var listItem = $('<li class="text-base hover:text-blue-500"></li>').text(searchTerm);
    searchHistoryList.append(listItem);
  };
}


// click event listener to search history list items
function handleHistoryItemClick() {
  $('#searchHistoryList').on('click', 'li', function() {
    var clickedSearchTerm = $(this).text();
    // Call getCurrentWeather() with the clicked search term
    getCurrentWeatherWithSearchTerm(clickedSearchTerm);
  });
}

function getCurrentWeatherWithSearchTerm(searchTerm) {
  city = searchTerm;
  getCurrentWeather();
}

displaySearchHistory();
handleHistoryItemClick();
