

const apiKey = "3053b1c8ec0bfb0fb8b2f11ac643a56f";

export async function getCoordinates(city) {
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    
        const response = await fetch(url);


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const coordinateData = await response.json();


            console.log("Success:", coordinateData);
     
            return{ lat: coordinateData[0].lat, lon: coordinateData[0].lon}
         
         
         
         
         
        
        


    


    
    
} // end getCoordinates 


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


    console.log("Success:" , dailyForecast);

    return dailyForecast
    
}