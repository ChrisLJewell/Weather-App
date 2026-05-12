

// Element selectors

const humidityEl = document.getElementById('humidity')
const feelsLikeEl = document.getElementById('feelsLike')
const descriptionEl = document.getElementById('weatherDescription')
const temperatureEl = document.getElementById('temperature')
const locationEl = document.getElementById('displayLocation')
const tempCheckboxEl = document.getElementById('tempToggle')
const dayEl = document.getElementById('day')
const icon = document.getElementById('icon')
const tempBtnEl = document.getElementById("toggleBtn")


export function displayWeather(data) {





  locationEl.textContent = data.name
  
  icon.alt = data.weather[0].description
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`


  feelsLikeEl.className = 'current-feels';
  feelsLikeEl.dataset.tempF = data.main.feels_like;
  feelsLikeEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°F`
  
  
  
  descriptionEl.textContent = data.weather[0].description


 

  
  temperatureEl.className = 'current-temp';
  temperatureEl.dataset.tempF = data.main.temp;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°F`
} // end displayWeather




export function displayDailyForecast(data) {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const container = document.querySelector(".forecast-container");
  container.innerHTML = " "; // clear it first



  data.list.forEach((day, index) => {
    
      const date = new Date(day.dt * 1000);
      const card = document.createElement("div");

      card.classList.add("forecast-card");
      const iconCode = day.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;



      card.innerHTML = `
    <h3>${days[date.getDay()]}</h3>
     <p>${date.getDate()}</p>
     <img src= " ${iconUrl} " alt = " ${day.weather[0].description} " >
    <p> ${day.weather[0].description}</p>

<p class="forecast-temp" data-temp-f="${day.temp.day}">${Math.round(day.temp.day)}°F</p>
  `;

      container.appendChild(card);


    

  }); // end for


} // end displayDailyForecast

export function showError(message) {
  locationEl.textContent = message
} //end showError


export function getLocation(onUpdate) {

  return navigator.geolocation.getCurrentPosition((position, error) => {
    // "Return" the data by passing it to  callback
    onUpdate(position.coords);
  });
}




function error(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationEl.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      locationEl.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      locationEl.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      locationEl.innerHTML = "An unknown error occurred."
      break;
  }
}

let isCelsius = false;

tempCheckboxEl.addEventListener('change', () => {  
  isCelsius = tempCheckboxEl.checked;              

  document.querySelectorAll('.current-temp, .forecast-temp, .current-feels').forEach(el => {
    const f = parseFloat(el.dataset.tempF);

    if (isCelsius) {
      el.textContent = el.classList.contains('current-feels')
        ? `Feels like: ${Math.round((f - 32) * 5 / 9)}°C`
        : `${Math.round((f - 32) * 5 / 9)}°C`;
    } else {
      el.textContent = el.classList.contains('current-feels')
        ? `Feels like: ${Math.round(f)}°F`
        : `${Math.round(f)}°F`;
    }
  });
});



































