const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = `1e82961c696b56c762abf27d96db4e75`;
const diffKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () =>{
    const city = document.getElementById('cityInput').value;
        
    if(city) {
        fetchWeather(city)
    } else {
        alert('Ingrese una ciudad válida')
    }
})

//Esto hace que el enter dispare la funcion
document.getElementById('cityInput').addEventListener('keypress', (e) =>{
    if (e.key === 'Enter'){
    const city = document.getElementById('cityInput').value;
    
    if(city) {
        fetchWeather(city)
    } else {
        alert('Ingrese una ciudad válida')
    }
}
});



function fetchWeather(city){
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(data => data.json())
    .then(data => showWeatherData(data)) //aca habia un console.log que mostraba toda la data por consola, ahora está el llamado a la funcion
}

function showWeatherData(data){
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';

    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp - diffKelvin)} Cº`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del: ${humidity}%`;    

    const icoInfo = document.createElement('img');
    icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`; //verificar en la documentacion como mostrar la imagen

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `El clima está con ${description}`;

    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(icoInfo);
    divResponseData.appendChild(descriptionInfo);
    
}   
