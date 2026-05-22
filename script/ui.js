

// Element selectors

const humidityEl = document.getElementById('humidity')
const feelsLikeEl = document.getElementById('feelsLike')
const descriptionEl = document.getElementById('weatherDescription')
const temperatureEl = document.getElementById('temperature')
const locationEl = document.getElementById('displayLocation')
const tempCheckboxEl = document.getElementById('tempToggle')
const dayEl = document.getElementById('day')
const iconEl = document.getElementById('icon')
const f_C = document.getElementById('F_C')
const tempBtnEl = document.getElementById("toggleBtn")
const wind = document.getElementById("wind")
const currentForecastBackground = document.querySelector(".current-forcast-container");
const container = document.querySelector(".forecast-container");
const loader = document.getElementById("loader")


export function displayWeather(data) {





const currentTime = data.dt;
const sunrise = data.sys.sunrise;
const sunset = data.sys.sunset;

const isNight = currentTime < sunrise || currentTime > sunset;

if(isNight){
  

currentForecastBackground.classList.forEach(className => {
    if (className.startsWith('day-') || className.startsWith('night-')) {
        currentForecastBackground.classList.remove(className);
    }
});



switch (data.weather[0].main) {
  case 'Clear': 
  currentForecastBackground.classList.add('night-clear');
  break;
  case 'Clouds': 
  currentForecastBackground.classList.add('night-clouds'); 
  break;
  case 'Rain': 
  currentForecastBackground.classList.add('night-rain');
   break;
  case 'Drizzle': 
  currentForecastBackground.classList.add('night-drizzle'); 
  break;
  case 'Thunderstorm': 
  currentForecastBackground.classList.add('night-thunderstorm');
   break;
  case 'Snow': 
  currentForecastBackground.classList.add('night-snow'); 
  break;
  case 'mist': 
  currentForecastBackground.classList.add('night-mist'); 
  break;
}



 
 


  currentForecastBackground.style.color = "white"; // white font 

 }else{


currentForecastBackground.classList.forEach(className => {
    if (className.startsWith('day-') || className.startsWith('night-')) {
        currentForecastBackground.classList.remove(className);
    }
});





switch (data.weather[0].main) {
  case 'Clear': 
    currentForecastBackground.classList.add('day-clear'); 
    break;
  case 'Clouds': 
    currentForecastBackground.classList.add('day-clouds'); 
    break;
  case 'Rain': 
    currentForecastBackground.classList.add('day-rain'); 
    break;
  case 'Drizzle': 
    currentForecastBackground.classList.add('day-drizzle'); 
    break;
  case 'Thunderstorm': 
    currentForecastBackground.classList.add('day-thunderstorm'); 
    break;
  case 'Snow': 
    currentForecastBackground.classList.add('day-snow'); 
    break;
  case 'mist': 
    currentForecastBackground.classList.add('day-mist'); 
    break;
}
  
 }



  locationEl.textContent = `${data.name} , ${data.sys.country}`
  
 
  humidityEl.textContent = `Humidity: ${data.main.humidity} %`
  iconEl.src =`images/${data.weather[0].icon}.svg`;


  feelsLikeEl.className = 'current-feels';
  feelsLikeEl.dataset.tempF = data.main.feels_like;
  feelsLikeEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°F`
  
  
  
  descriptionEl.textContent = data.weather[0].description
  wind.textContent = `Wind speed ${data.wind.speed} mph`


 

  
  temperatureEl.className = 'current-temp';
  temperatureEl.dataset.tempF = data.main.temp;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°`
} // end displayWeather




export function displayDailyForecast(data) {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  container.innerHTML = " "; // clear it first



  data.list.forEach((day, index) => {
    
      const date = new Date(day.dt * 1000);
      const card = document.createElement("div");

      card.classList.add("forecast-card");
      const iconCode = day.weather[0].icon;
     



      card.innerHTML = `
    <h3 id = "forecast-card-day">${days[date.getDay()]}</h3>
     <p id = "forecast-card-date">${date.getDate()}</p>
     <img src= "images/${iconCode}.svg " alt = "${day.weather[0].description}" >
    <p> ${day.weather[0].description}</p>

<span 
  class="forecast-temp" 
  data-temp-max-f="${day.temp.max}" 
  data-temp-min-f="${day.temp.min}">
  ${Math.round(day.temp.max)}° / ${Math.round(day.temp.min)}°
</span>

  `;

      container.appendChild(card);


    

  }); // end for


} // end displayDailyForecast





export function getLocation(onUpdate) {

  return navigator.geolocation.getCurrentPosition((position, error) => {
    // "Return" the data by passing it to  callback
    onUpdate(position.coords);
  });
} // end getLocation




export function showError(error) {
  switch (error.code) {
    
    case error.PERMISSION_DENIED:
      locationEl.innerHTML = "City not found, please try again"
      container.innerHTML = " No forecast available"
      descriptionEl.innerHTML = " "
      break;
    case error.POSITION_UNAVAILABLE:
      locationEl.innerHTML = "Location information is unavailable."
      container.innerHTML = " No forecast available"
      descriptionEl.innerHTML = " "
      break;
    case error.TIMEOUT:
      locationEl.innerHTML = "The request to get user location timed out."
      container.innerHTML = " No forecast available"
      descriptionEl.innerHTML = " "
      break;
    case error.UNKNOWN_ERROR:
      locationEl.innerHTML = "An unknown error occurred."
      container.innerHTML = " No forecast available"
      descriptionEl.innerHTML = " "
      break;

     

      
  }
} // end weather 

let isCelsius = false;

tempCheckboxEl.addEventListener('change', () => {
  isCelsius = tempCheckboxEl.checked;










  document.querySelectorAll('.current-temp, .forecast-temp, .current-feels')
    .forEach(el => {

      // Forecast temps (max/min)
      if (el.classList.contains('forecast-temp')) {

        const maxF = parseFloat(el.dataset.tempMaxF);
        const minF = parseFloat(el.dataset.tempMinF);

        if (isCelsius) {
          const maxC = Math.round((maxF - 32) * 5 / 9);
          const minC = Math.round((minF - 32) * 5 / 9);

          el.textContent = `${maxC}° / ${minC}°`;
          
        } else {
          el.textContent = `${Math.round(maxF)}° / ${Math.round(minF)}°`;
        }

        return;
      }

      // Current temp / feels like
      const f = parseFloat(el.dataset.tempF);

      if (isCelsius) {
        el.textContent = el.classList.contains('current-feels')
          ? `Feels like: ${Math.round((f - 32) * 5 / 9)}°`
          : `${Math.round((f - 32) * 5 / 9)}°`;
          f_C.innerHTML = "Celsius" // label for toggle
      } else {
        el.textContent = el.classList.contains('current-feels')
          ? `Feels like: ${Math.round(f)}°`
          : `${Math.round(f)}°`;
           f_C.innerHTML = "Fahrenheit" // label for toggle
      }
    });
}); // end toggle checkbox


export function showLoading(){

  
   loader.style.display = "block";
  
 
 
 humidityEl.textContent = " ";
 iconEl.src ="";


 feelsLikeEl.textContent = " "
 
 
 
 descriptionEl.textContent + " "
 wind.textContent = " "
 



 temperatureEl.textContent = " "
}


export function removeLoading(){

  loader.style.display = "none";
}










































