

const apiKey = "3053b1c8ec0bfb0fb8b2f11ac643a56f";

export async function getCoordinates(city) {
  // Regex to match "city, state" format e.g. "Flushing, MI"
  const cityStateRegex = /^([a-zA-Z\s]+)(?:,\s*|\s+)([a-zA-Z]{2})$/;
  const match = city.trim().match(cityStateRegex);

  let query = city;
  let stateCode = null;

  if (match) {
    const cityName = match[1].trim();
    stateCode = match[2].toUpperCase();
    query = `${cityName},${stateCode},US`; 
  }

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const coordinateData = await response.json();
  console.log("Success:", coordinateData);

  if (!coordinateData.length) {
    throw new Error("No results found for that location.");
  }

  // Loop through results to find the one matching the state
  if (stateCode) {
    const stateMatch = coordinateData.find(
      (location) => location.state?.toUpperCase() === stateCode
    );

    if (stateMatch) {
      
      return { lat: stateMatch.lat, lon: stateMatch.lon };
    }
  }

  // Fallback to first result
  return { lat: coordinateData[0].lat, lon: coordinateData[0].lon };
}// end getCoordinates 


export async function getWeather(lat, lon) {




    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;


    
        const response = await fetch(url);




        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();


        console.log("Success:", weatherData);


   
   
   

    return weatherData

} // end getWeather



export async function getDailyForecast(lat,lon,cnt) {


    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=imperial&appid=${apiKey}`;

   const response = await fetch(url);

    if(!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);

    }
    const dailyForecast = await response.json();


   

    return dailyForecast
    
}