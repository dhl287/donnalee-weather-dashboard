var apiKey = "572661e61377e7d7c006042ef76c9263";

var main = $('main');
var form = $('#form');
var search = $('#search');
var lat = '52.5';
var lon = '-1.95';  
var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
var city = '';
var searchBtn = $('#searchBtn');



function getWeatherByLocation(city) {
    fetch(url(city), { origin: "cros" })
      .then((resp) => resp.json())
      .then((respData) => {
        addWeatherToPage(respData);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

      function addWeatherToPage(data){
          const temp = Ktof(data.main.temp);

          const weather = document.createElement('div')
          weather.classList.add('weather');
          

          weather.innerHTML = `
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <small>${data.weather[0].main}</small>
          
          `;


      
          main.innerHTML= "";
           main.appendChild(weather);
      };

    // Kelvin to Fahrenheit formula
     function Ktof(K){
         return Math.floor((K - 273.15) * 1.8 + 32);
     }

     function addWeatherToPage(data){
        const temp = Ktof(data.main.temp);

        const weather = document.createElement('div')
        weather.classList.add('weather');
        

        weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[1].icon}@2x.png" /> ${temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[1].icon}@2x.png" /></h2>
        <small>${data.weather[1].main}</small>
        
        `;


    
        main.innerHTML= "";
         main.appendChild(weather);
    };

  // Kelvin to Fahrenheit formula
   function Ktof(K){
       return Math.floor((K - 273.15) * 1.8 + 32);
   }


     form.addEventListener('submit',(event) =>{
        event.preventDefault();

        var city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });