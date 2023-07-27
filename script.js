// unique API key
var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('main');
var form = $('#form');
var search = $('#search');
var lat = '';
var lon = '';  
var city = '';

for (let i = 0; i < 5; i++) {
  console.log((i * 7) + 1);
}


// use API to get weather by location, fetch request, 5-day, update function name to 5-day
function getWeatherByLocation() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`, { mode: "cors" })
      .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        if(respData != null){
        lat = respData.city.coord.lat;
        lon = respData.city.coord.lon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(
          (resp) => resp.json()
        ).then(
          (respData) => {
            console.log(respData)
            addWeatherToPageFive(respData)
          }
        )
        }
        
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

  function getCurrentWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        addWeatherToPage(respData)
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }


// add weather info to page and HTML, 5-day weather call
function addWeatherToPageFive(data){
  
  var weatherFive = document.createElement('div')
  weatherFive.classList.add('weather');
  
  for (let i = 0; i < 5; i++) {
    console.log((i * 7) + 1);
    if (data.list === 0)
  weather.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${data.main.temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <h4>${data.weather[0].main}</h4>
  <h4>Humidity: ${data.main.humidity}</h4>
  <h4>Wind Speed: ${data.wind.speed}</h4>
  `;
  }

  section.innerHTML= "";
  section.append(weatherFive);
};



  // add weather info to page and HTML, current weather call
      function addWeatherToPage(data){
          // var temp = Ktof(data.main.temp);

          var weather = document.createElement('div')
          weather.classList.add('weather');
          
          weather.innerHTML = `
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
            getWeatherByLocation()
            getCurrentWeather()
        }

     });
     // click clear button event
    //  form.on('clear',(event) =>{
    //   console.log("CLEAR")
    //     event.preventDefault();

    //     city = search.val();
    //     console.log(city);
    //     if(city){
    //         getWeatherByLocation()
    //     }

    //  });

    // form.on('clear',(event) =>{
    //   console.log("CLEAR")
    //     // event.preventDefault();

    //     search.innerHTML = "";
    // });

    document.getElementById("clearBtn").addEventListener("search", function(event) {
      search.empty();  
    });

