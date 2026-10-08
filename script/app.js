import { getCoordinates, getWeather, getDailyForecast } from './api.js'
import { displayWeather, showError, removeLoading,  displayDailyForecast,getLocation, showLoading} from './ui.js'

const form = document.getElementById('weatherForm')
const cityInput = document.getElementById('cityName')
const tempCheckboxEl = document.getElementById('tempToggle')

const AMOUNT_OF_DAYS = 16;










let units = "imperial";

const watchID = getLocation(async (coords) => {

    const lat = coords.latitude;
    const lon = coords.longitude;

    try {
        // Initial weather request
        const weather = await getWeather(lat, lon, units);
        const dailyForecast = await getDailyForecast(
            lat,
            lon,
            AMOUNT_OF_DAYS,
            units
        );

        displayWeather(weather,units);
        displayDailyForecast(dailyForecast);

        // Temperature toggle
        tempCheckboxEl.addEventListener('change', async () => {

            if (tempCheckboxEl.checked) {
                units = "metric";
               // f_C = "Celsius";
            } else {
                units = "imperial";
               // f_C = "Fahrenheit";
            }

            try {
                const weather = await getWeather(lat, lon, units);
                const dailyForecast = await getDailyForecast(
                    lat,
                    lon,
                    AMOUNT_OF_DAYS,
                    units
                );

                displayWeather(weather,units);
                displayDailyForecast(dailyForecast);

            } catch (error) {
                showError(error);
            }
        });

    } catch (error) {
        showError(error);
    }
});


                                                          
                                                          

























form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) return

  showLoading();

 
  try {
    removeLoading();
    const coords = await getCoordinates(city);
    const weather = await getWeather(coords.lat, coords.lon, units);
    const dailyForecast = await getDailyForecast(coords.lat,coords.lon,AMOUNT_OF_DAYS,units);
    displayWeather(weather);
    displayDailyForecast(dailyForecast);
    
    
  } catch (error) {
  showError(error);
  }
})