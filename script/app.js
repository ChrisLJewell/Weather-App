import { getCoordinates, getWeather, getDailyForecast } from './api.js'
import { displayWeather, showError, displayDailyForecast } from './ui.js'

const form = document.getElementById('weatherForm')
const cityInput = document.getElementById('cityName')

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) return

  try {
    const coords = await getCoordinates(city);
    const weather = await getWeather(coords.lat, coords.lon);
    const dailyForecast = await getDailyForecast(coords.lat,coords.lon,10);
    displayWeather(weather);
    displayDailyForecast(dailyForecast);
  } catch (error) {
    showError('City not found, please try again')
  }
})