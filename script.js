var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('main');
var form = $('#form');
var search = $('#search');
var lat = '';
var lon = '';  
var city = '';
var searchBtn = $('#searchBtn');



function getWeatherByLocation() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`, { origin: "cros" })
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
            console.log
            addWeatherToPage(respData)
          }
        )
        }
        
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

      function addWeatherToPage(data){
          var temp = Ktof(data.main.temp);

          var weather = document.createElement('div')
          weather.classList.add('weather');
          

          weather.innerHTML = `
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <small>Description: ${data.weather[0].main}</small><br><br>
          <small>Humidity: ${data.main.humidity}</small><br><br>
          <small>Wind Speed: ${data.wind.speed}</small><br><br>
          
          `;

      
          main.innerHTML= "";
           main.append(weather);
      };

    // Kelvin to Fahrenheit formula
     function Ktof(K){
         return Math.floor((K - 273.15) * 1.8 + 32);
     }

  


     form.on('submit',(event) =>{
      console.log("SUBMIT")
        event.preventDefault();

        city = search.val();
        console.log(city);
        if(city){
            getWeatherByLocation()
        }

     });