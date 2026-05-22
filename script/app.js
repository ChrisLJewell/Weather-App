import { getCoordinates, getWeather, getDailyForecast,getHourlyForecast } from './api.js'
import { displayWeather, showError, removeLoading,  displayDailyForecast,getLocation, showLoading, hourlyChart} from './ui.js'

const form = document.getElementById('weatherForm')
const cityInput = document.getElementById('cityName')
const AMOUNT_OF_DAYS = 16;



const watchID = getLocation(async(coords) => {


let lat = coords.latitude
let lon = coords.longitude


 
 try {

  const hourlyForecast = await getHourlyForecast(lat,lon);

  const weather = await getWeather(lat, lon);
 const dailyForecast = await getDailyForecast(lat,lon,AMOUNT_OF_DAYS);
    
    
  displayWeather(weather);
 hourlyChart(hourlyForecast);
  displayDailyForecast(dailyForecast);
  
  
} catch (error) {
  showError(error)}





});











form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) return

  showLoading();

 
  try {
    removeLoading();
    const hourlyForecast = await getHourlyForecast(lat,lon);
    const coords = await getCoordinates(city);
  
    const weather = await getWeather(coords.lat, coords.lon);
    const dailyForecast = await getDailyForecast(coords.lat,coords.lon,AMOUNT_OF_DAYS);
  
      
    displayWeather(weather);
    hourlyChart(hourlyForecast);
    displayDailyForecast(dailyForecast);
    
    
  } catch (error) {
  showError(error);
  }
})