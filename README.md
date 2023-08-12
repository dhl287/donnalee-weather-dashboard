# donnalee-weather-dashboard

## Description
This challenge required me to create a Weather Dashboard that allows a user to search for a city and retrieve the weather data for that city. The current weather (today's weather) and the weather for the following five days are visible for every searched city, and the searched city is moved to the search history once the user clicks clear and clears the search. 

## Installation
My responsibility was to satisfy the acceptance criteria, create a new repository on GitHub, commit and push any changes to the repository, and deploy to GitHub Pages to view the website live. The weather dashboard was created with no starter code. The HTML code is available on index.html, the CSS code is available on style.css, styling was also added through Tailwind CSS, and JavaScript code (powered by jQuery) is available on script.js in the donnalee-weatherdashboard. 

## Usage
The user is able to search by city in the search field. They can click "enter" on their keyboard or click the search button to initiate the search. 

<!-- search field image -->

The "Current Weather" and "Next Five Days of Weather" sections below the search field show the areas where the city's weather information will be displayed when the search is initiated. The city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed are displayed for the current day in the "Current Weather" section. The same information is then displayed for the next five days in the "Next Five Days of Weather" section. 

<!-- current weather and 5-day weather image -->

The user can click the clear button to clear the page and start a new search. The cleared city name will be shown in the "Search History" section. When the user clicks a city name in the "Search History" section, the page will display the current weather and five days of weather for that particular city. 

<!-- search history image -->

## Areas of Opportunity
Depending on the time of day that you search a city, the Current Weather and first day of the five days of weather may be different or the same. 

If the user does not click the clear button to clear the page and initiates a new search, the weather information for the previously searched city and newly searched city will appear in the "Current Weather" and "Next Fives Days of Weather" sections.

<!-- image of two city searches when not clicking clear button -->

The challenge has been deployed. 
* [Deployed Link] https://dhl287.github.io/donnalee-workday-scheduler/ 

## Credits
I would like to credit the following sources for study materials in adding all code: 

* [Tailwind CSS Documentation] https://tailwindcss.com/docs/installation/play-cdn
* [CodWithRandom] https://www.codewithrandom.com/2023/03/16/weather-app-javascript-weather-app-using-html-css-javascript/
* [Day.js Format] https://day.js.org/docs/en/display/format 
* [5 day weather forecast] https://openweathermap.org/forecast5

## License
There is no license associated with donnalee-weather-dashboard.
