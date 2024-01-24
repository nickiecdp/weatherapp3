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
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Greenville")