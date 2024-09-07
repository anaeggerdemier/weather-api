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

    function showLoader(show) {
        if (loader) {
            loader.classList.toggle('d-none', !show);
        } else {
            console.error('Loader element not found');
        }
    }

    function showError(message) {
        if (errorBox) {
            errorBox.textContent = message;
            errorBox.classList.remove('d-none');
        } else {
            console.error('Error box element not found');
        }
    }

    function updateWeatherResults(city, iconCode, temperature, description) {
        if (weatherResults) {
            weatherResults.innerHTML = `
                <div class="text-center">
                    <h2>${city}</h2>
                    <img src="${iconMap[iconCode] || 'https://bmcdn.nl/assets/weather-icons/v2.0/line/unknown.svg'}" alt="Weather Icon" height="48">
                    <p class="font-weight-bold">Temperature: ${temperature} °C</p>
                    <p class="font-italic">Description: ${description}</p>
                </div>
            `;
            weatherResults.style.display = 'block'; // Garante que os resultados sejam exibidos
        } else {
            console.error('Weather results element not found');
        }
    }

    function fetchWeather(url, city) {
        showLoader(true);

        // Dados simulados
        const mockData = {
            weather: [
                { icon: '01d', description: 'Clear sky' }
            ],
            main: { temp: 293.15 } // Temperatura em Kelvin
        };

        // Simulação de delay para imitar uma chamada real à API
        setTimeout(() => {
            const iconCode = mockData.weather[0].icon;
            const temperature = (mockData.main.temp - 273.15).toFixed(1);
            const description = mockData.weather[0].description;

            updateWeatherResults(city, iconCode, temperature, description);
            showLoader(false);
        }, 1000); // 1 segundo de atraso
    }

    function fetchWeatherByCoords(lat, lon) {
        showLoader(true);

        // Dados simulados
        const mockData = {
            weather: [
                { icon: '02d', description: 'Few clouds' }
            ],
            main: { temp: 288.15 } // Temperatura em Kelvin
        };

        // Simulação de delay para imitar uma chamada real à API
        setTimeout(() => {
            const iconCode = mockData.weather[0].icon;
            const temperature = (mockData.main.temp - 273.15).toFixed(1);
            const description = mockData.weather[0].description;

            updateWeatherResults('Current Location', iconCode, temperature, description);
            showLoader(false);
        }, 1000); // 1 segundo de atraso
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        errorBox.classList.add('d-none');
        const city = document.getElementById('city-search').value.trim();

        if (!/^[a-zA-Z\s]+$/.test(city)) {
            showError('Please enter a valid city name.');
            return;
        }

        fetchWeather(null, city); // URL não é usada na simulação
    });

    document.getElementById('locate-btn').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            }, error => {
                console.error('Geolocation error:', error);
                showError('Failed to get your location. Please try again later.');
            });
        } else {
            showError('Geolocation is not supported by this browser.');
        }
    });
});
