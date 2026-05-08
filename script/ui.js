

// Element selectors

const humidityEl = document.getElementById('humidity')
const feelsLikeEl = document.getElementById('feelsLike')
const descriptionEl = document.getElementById('weatherDescription')
const temperatureEl = document.getElementById('temperature')
const locationEl = document.getElementById('displayLocation')
const tempCheckboxEl = document.getElementById('tempToggle')
const dayEl = document.getElementById('day')


export function displayWeather(data) {
  
  locationEl.textContent = data.name
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`
  feelsLikeEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°F`
  descriptionEl.textContent = data.weather[0].description
  temperatureEl.textContent = `${Math.round(data.main.temp)}°F`

// Fahrenheit and celsius toggle
tempCheckboxEl.addEventListener('change', () => {
  if(tempCheckboxEl.checked){
    // display C

    let todayTempFahrenheit = data.main.temp
    let todayFeelsLike = data.main.feels_like

    let cel = Math.round ((todayTempFahrenheit-32) * 5/9  );
    let celFeelLike= Math.round((todayFeelsLike - 32) * 5/9); 


   temperatureEl.textContent = `${cel}°C`
   feelsLikeEl.textContent = `Feels like: ${celFeelLike}°C`




  }else {

     temperatureEl.textContent = `${Math.round(data.main.temp)}°F`
     feelsLikeEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°F`


    // display F
  }
})
//end toggle



} // end displayWeather




export function displayDailyForecast(data) {

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const container = document.querySelector(".forecast-container");



data.list.forEach(day  => {
  const date = new Date(day.dt * 1000);
  const card = document.createElement("div");
  card.classList.add("forecast-card");

  card.innerHTML = `
    <h3>${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</h3>
    <p> ${day.weather[0].description}</p>
    <p> ${Math.round(day.temp.day)}°F </p>
  `;

  container.appendChild(card);







  
}); // end for











} // end displayDailyForecast

export function showError(message) {
  locationEl.textContent = message
} //end showError







