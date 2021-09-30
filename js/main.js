// Guardo API Key en variable:
let API_KEY = "074fca41127f67c476cd047f24d75023";

// Guardo la URL en otra variable:
let URL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Guardo el lenguaje en una variable:
let lang = 'es';


// Busco en el HTML:
let button = document.getElementById('submit');
let searcher = document.getElementById('search');
let city = document.getElementById('city');
let tempMax = document.getElementById('temp_max');
let tempMin = document.getElementById('temp_min');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let windSpeed = document.getElementById('wind_speed');
let clima = document.getElementById('clima');
let change = document.getElementById('change');
let changePC = document.getElementById('change-pc');
let changeTablet = document.getElementById('change-tablet');
let changeMobile = document.getElementById('change-mobile');
let formCity = document.getElementById('form-city');


// Guardo local storage de la última búsqueda.
let valueLastSearch = JSON.parse(localStorage.getItem("responseCity"));

if (valueLastSearch != null) {
    madeList(valueLastSearch);
}

// Funcion para tomar el valor de nuestro input y colocarlo en la URL:
function clickSend() {

        searchWeather(searcher.value);
}

// addEventListener para cuando el usuario clickea enviar:
button.addEventListener("click", clickSend);

// Función para buscar en la API
function searchWeather(cityName) {

    fetch(`${URL}${cityName}&appid=${API_KEY}&lang=${lang}&units=metric`)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(responseJSON) {
            console.log('imprimo JSON', responseJSON);
            madeList(responseJSON);
            saveResults('responseCity', responseJSON);
        })
        .catch(function(error){
            console.log('Falló!', error);
            city.innerHTML = 'Nombre incorrecto';
            tempMax.innerHTML = '';
            tempMin.innerHTML = '';
            humidity.innerHTML = '';
            pressure.innerHTML = '';
            windSpeed.innerHTML = '';
            clima.innerHTML = '';


        })
}

// Función para localStorage.
function saveResults(name,data) {

    localStorage.setItem(name, JSON.stringify(data));

}

// Función para crear la lista de info en HTML.
function madeList(data) {
    city.innerHTML = data['name'];
    tempMax.innerHTML = '<span class="fw-bold">Temperatura máxima:</span> ' + data['main']['temp_max'] + 'º';
    tempMin.innerHTML = '<span class="fw-bold">Temperartura mínima:</span> ' + data['main']['temp_min'] + 'º';
    humidity.innerHTML = '<span class="fw-bold">Humedad:</span> ' + data['main']['humidity'] + '%';
    pressure.innerHTML = '<span class="fw-bold">Presión atmosférica:</span> ' + data['main']['pressure'] + 'hPa';
    windSpeed.innerHTML = '<span class="fw-bold">Velocidad del viento:</span> ' + data['wind']['speed'] + ' m/s';
    clima.innerHTML = '<span class="fw-bold">Clima:</span> ' + data['weather'][0]['description'];


    if (data['weather'][0]['main'] === 'Clouds'){

        change.setAttribute('href', 'css/estilo-clouds.css');
        changePC.setAttribute('href', 'css/estilo-clouds-pc.css');
        changeTablet.setAttribute('href', 'css/estilo-clouds-tablet.css');
        changeMobile.setAttribute('href', 'css/estilo-clouds-mobile.css');


    } else if (data['weather'][0]['main'] === 'Clear') {

        change.setAttribute('href', 'css/estilo-clear.css');
        changePC.setAttribute('href', 'css/estilo-clear-pc.css');
        changeTablet.setAttribute('href', 'css/estilo-clear-tablet.css');
        changeMobile.setAttribute('href', 'css/estilo-clear-mobile.css');


    } else if (data['weather'][0]['main'] === 'Thunderstorm') {

        change.setAttribute('href', 'css/estilo-thunder.css');
        changePC.setAttribute('href', 'css/estilo-thunder-pc.css');
        changeTablet.setAttribute('href', 'css/estilo-thunder-tablet.css');
        changeMobile.setAttribute('href', 'css/estilo-thunder-mobile.css');


    } else if (data['weather'][0]['main'] === 'Drizzle' || data['weather'][0]['main'] === 'Rain') {

        change.setAttribute('href', 'css/estilo-rain.css');
        changePC.setAttribute('href', 'css/estilo-rain-pc.css');
        changeTablet.setAttribute('href', 'css/estilo-rain-tablet.css');
        changeMobile.setAttribute('href', 'css/estilo-rain-mobile.css');


    } else if (data['weather'][0]['main'] === 'Snow') {

        change.setAttribute('href', 'css/estilo-snow.css');
        changePC.setAttribute('href', 'css/estilo-snow-pc.css');
        changeTablet.setAttribute('href', 'css/estilo-snow-tablet.css');
        changeMobile.setAttribute('href', 'css/estilo-snow-mobile.css');

    }

}








