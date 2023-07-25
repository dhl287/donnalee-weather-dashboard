var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('main');
var form = $('#form');
var search = $('#search');
var lat = '';
var lon = '';  
var city = '';

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
          <h4>${data.weather[0].main}</h4>
          <h4>Humidity: ${data.main.humidity}</h4>
          <h4>Wind Speed: ${data.wind.speed}</h4>
          
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

    //  form.on('clear',(event) =>{
    //   console.log("CLEAR")
    //     event.preventDefault();

    //     city = search.val();
    //     console.log(city);
    //     if(city){
    //         getWeatherByLocation()
    //     }

    //  });