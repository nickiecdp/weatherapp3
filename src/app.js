function refreshWeather(response){
    temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
     let timeElement = document.querySelector("#time");
     let date = new Date(response.data.time * 1000);
     let iconElement=document.querySelector("#icon")
     
    iconElement.innerHTML= `<img src=${response.data.condition.icon_url}
                  class="weather-app-image" />`
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    timeElement.innerHTML = formatDate(date);

    getForcast(response.data.city);
 
}
function formatDate(date){
    
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes= date.getMinutes();
    
    if (minutes < 10) {
        minutes=`0${minutes}`
    };
    
    
    return `${day} ${hours}:${minutes}`
}
    
   

    

function searchCity(city) {
  
let apiKey = "foa37dd45976t896b4240bb8863b3e41";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
console.log(apiUrl);
}

function getForcast(city) {
  
let apiKey = "foa37dd45976t896b4240bb8863b3e41";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
;
console.log (apiUrl);
axios.get(apiUrl).then(displayforcast);
}
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
}
function formatDay(timestamp){
   let date= new Date( timestamp * 1000);    
    let days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat",];

    return days[date.getDay()];
}

function displayforcast(response) {
    console.log(response.data);
    
let forcastElement = document.querySelector("#forcast");


let forcastHTML="";

response.data.daily.forEach(function(day,index){
if (index<5){
    forcastHTML=forcastHTML+`
                <div class="weather-forecast-day">
                <div class="weather-forcast-date">${formatDay(day.time)}</div>
             
                  <img
                    src="${day.condition.icon_url}"
                    class="weather-forcast-image"               />
               
                <div class="weather-forecast-temps">  
                <div class="weather-forcast-temp">
                <div class="weather-forcast-min-temp">${Math.round(day.temperature.minimum)}°</div> <div class="weather-forcast-max-temp">${Math.round(day.temperature.maximum)}°</div> 
              </div>
            </div>
            </div>
            `;
            }
});

forcastElement.innerHTML=forcastHTML;
}


let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Greenville");

