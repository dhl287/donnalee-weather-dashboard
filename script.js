// unique API key
var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('#main');
var five = $('#five');
var form = $('#form');
var search = $('#search');
var searchBtn = $('#searchBtn');
var lat = '';
var lon = '';  
var city = '';


// use API to get weather by location, fetch request, current and 5-day weather
function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`, { mode: "cors" })
      .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        renderFive(respData.list)
        
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

// display 5-day forecast
function renderFive(weatherArray) {

  console.log(weatherArray)

  var dayOne = dayjs().add(1, 'day').format("YYYY-MM-DD 00:00:00");
  var dayTwo = dayjs().add(2, 'day').format("YYYY-MM-DD 00:00:00");
  var dayThree = dayjs().add(3, 'day').format("YYYY-MM-DD 00:00:00");
  var dayFour = dayjs().add(4, 'day').format("YYYY-MM-DD 00:00:00");
  var dayFive = dayjs().add(5, 'day').format("YYYY-MM-DD 00:00:00");

  console.log(dayOne, dayTwo, dayThree, dayFour, dayFive);

  var dayOneData = weatherArray.find(element => element.dt_txt == dayOne);
  var dayTwoData = weatherArray.find(element => element.dt_txt == dayTwo);
  var dayThreeData = weatherArray.find(element => element.dt_txt == dayThree);
  var dayFourData = weatherArray.find(element => element.dt_txt == dayFour);
  var dayFiveData = weatherArray.find(element => element.dt_txt == dayFive);

  var fiveDayData = [
    dayOneData,
    dayTwoData,
    dayThreeData,
    dayFourData,
    dayFiveData
  ]

  for(i = 0; i < fiveDayData.length; i++) {
    
    var fiveWeather = document.createElement('div');
    fiveWeather.classList.add('five-weather');
    
    var data = fiveDayData[i];
    fiveWeather.innerHTML = `
        <h4 id="date">${dayjs(data.dt * 1000).format("MM/DD/YYYY")}</h4
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${data.main.temp}°F </h2>
        <h4>${data.weather[0].main}</h4>
        <h4>Humidity: ${data.main.humidity}</h4>
        <h4>Wind Speed: ${data.wind.speed}</h4>
        <br>
        <hr>
        <br>
    `;

    five.innerHTML = "";
    five.append(fiveWeather);
  }
};


  // add weather info to page and HTML, current weather call
      function addWeatherToPage(data){

          var weather = document.createElement('div');
          weather.classList.add('weather');
          
          weather.innerHTML = `
          <h2 class="text-2xl font-semibold">${data.name}</h2>
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" id="icon" /> ${data.main.temp}°F </h2>
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
      getWeather()
    }

  });

  // clear weather results function, will be added to click clear button event
  function clearWeatherResults () {
    $(".weather").html("");
    $(".five-weather").html("");
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
    // Call getWeather() with the clicked search term
    getWeatherWithSearchTerm(clickedSearchTerm);
  });
}

function getWeatherWithSearchTerm(searchTerm) {
  city = searchTerm;
  getWeather();
}

displaySearchHistory();
handleHistoryItemClick();
