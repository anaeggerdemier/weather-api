document.addEventListener('DOMContentLoaded', () => {
    const iconMap = {
        '01d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/clear-day.svg',
        '01n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/clear-night.svg',
        '02d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/partly-cloudy-day.svg',
        '02n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/partly-cloudy-night.svg',
        '03d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/cloudy.svg',
        '03n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/cloudy.svg',
        '04d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/cloudy.svg',
        '04n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/cloudy.svg',
        '09d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/rain.svg',
        '09n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/rain.svg',
        '10d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/rain.svg',
        '10n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/rain.svg',
        '11d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/thunderstorms.svg',
        '11n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/thunderstorms.svg',
        '13d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/snow.svg',
        '13n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/snow.svg',
        '50d': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/tornado.svg',
        '50n': 'https://bmcdn.nl/assets/weather-icons/v2.0/line/tornado.svg',
    };

    const form = document.getElementById('search-form');
    const weatherResults = document.getElementById('weather-results');
    const errorBox = document.getElementById('error-box');
    const loader = document.querySelector('.loader');

    function showWeatherResults() {
        weatherResults.style.display = 'block';
    }

    function fetchWeather(city) {
        const apiKey = 'f8f87f167d2b7b59f54ca69f4fb82e2b';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        loader.classList.remove('d-none'); 

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch weather data');
                return response.json();
            })
            .then(data => {
                const iconCode = data.weather[0].icon;
                const temperature = (data.main.temp - 273.15).toFixed(1); 
                const description = data.weather[0].description;

                weatherResults.innerHTML = `
                    <div class="text-center">
                        <h2>${city}</h2>
                        <img src="${iconMap[iconCode] || 'https://bmcdn.nl/assets/weather-icons/v2.0/line/unknown.svg'}" alt="Weather Icon" height="48">
                        <p class="font-weight-bold">Temperature: ${temperature} °C</p>
                        <p class="font-italic">Description: ${description}</p>
                    </div>
                `;
                showWeatherResults(); 
            })
            .catch(error => {
                console.error('Error:', error);
                errorBox.textContent = 'Failed to fetch weather data. Please try again later.';
                errorBox.classList.remove('d-none');
            })
            .finally(() => {
                loader.classList.add('d-none'); 
            });
    }

    
    function fetchWeatherByCoords(lat, lon) {
        const apiKey = 'f8f87f167d2b7b59f54ca69f4fb82e2b'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        loader.classList.remove('d-none'); 

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch weather data');
                return response.json();
            })
            .then(data => {
                const iconCode = data.weather[0].icon;
                const temperature = (data.main.temp - 273.15).toFixed(1); 
                const description = data.weather[0].description;

                weatherResults.innerHTML = `
                    <div class="text-center">
                        <h2>Current Location</h2>
                        <img src="${iconMap[iconCode] || 'https://bmcdn.nl/assets/weather-icons/v2.0/line/unknown.svg'}" alt="Weather Icon" height="48">
                        <p class="font-weight-bold">Temperature: ${temperature} °C</p>
                        <p class="font-italic">Description: ${description}</p>
                    </div>
                `;
                showWeatherResults(); 
            })
            .catch(error => {
                console.error('Error:', error);
                errorBox.textContent = 'Failed to fetch weather data. Please try again later.';
                errorBox.classList.remove('d-none');
            })
            .finally(() => {
                loader.classList.add('d-none'); 
            });
    }

    // "Search"
    form.addEventListener('submit', event => {
        event.preventDefault();
        errorBox.classList.add('d-none'); 
        const city = document.getElementById('city-search').value.trim();

        if (!/^[a-zA-Z\s]+$/.test(city)) {
            errorBox.textContent = 'Please enter a valid city name.';
            errorBox.classList.remove('d-none');
            return;
        }

        fetchWeather(city);
    });

    // "Use My Location"
    document.getElementById('locate-btn').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon); 
            }, error => {
                console.error('Geolocation error:', error);
                errorBox.textContent = 'Failed to get your location. Please try again later.';
                errorBox.classList.remove('d-none');
            });
        } else {
            errorBox.textContent = 'Geolocation is not supported by this browser.';
            errorBox.classList.remove('d-none');
        }
    });
});
