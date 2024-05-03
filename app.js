document.addEventListener('DOMContentLoaded', function() {
    // Function to create elements
    function createElement(tag, className = '') {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        return element;
    }

    // Function to add classes to element
    function addClasses(element, classNames) {
        if (classNames) {
            const classes = classNames.split(' ');
            element.classList.add(...classes);
        }
    }

    // Helper function to append multiple children to a parent element
    function appendChildren(parent, children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
    }

    // Function to display an error message
    function displayError(message) {
        const errorBox = document.getElementById('error-box');
        errorBox.textContent = message;
        errorBox.style.display = 'block'; // Display the error box
    }

    // Function to hide the error message
    function hideError() {
        const errorBox = document.getElementById('error-box');
        errorBox.textContent = '';
        errorBox.style.display = 'none'; // Hide the error box
    }

    // Mapping of weather codes to icon URLs
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

    // Create the divApi element
    const divApi = createElement('div', 'api');

    // Create the informational content about the API key and add it inside divApi
    const divApiContainer = createElement('div', 'container');
    const pElement = createElement('p');
    pElement.style.float = 'left';
    const imgElement = createElement('img');
    imgElement.src = 'https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg';
    imgElement.alt = 'Partly Cloudy Day';
    imgElement.height = '48';
    appendChildren(pElement, [imgElement]);
    divApiContainer.appendChild(pElement);
    const h2Api = createElement('h2');
    h2Api.textContent = 'OpenWeather API';
    const aApi = createElement('a');
    aApi.setAttribute('target', '_blank');
    aApi.setAttribute('href', 'https://home.openweathermap.org/users/sign_up');
    aApi.setAttribute('rel', 'noopener noreferrer');
    aApi.textContent = ' Get your free key here!';
    h2Api.appendChild(aApi);
    divApiContainer.appendChild(h2Api);
    divApi.appendChild(divApiContainer);

    // Select the main element of the document
    const main = document.querySelector('main');

    // Create elements for the top banner using Bootstrap
    const sectionTopBanner = createElement('section', 'top-banner');
    addClasses(sectionTopBanner, 'text-light py-3');
    const divTopBannerContainer = createElement('div', 'container');
    const h1TopBannerHeading = createElement('h1', 'display-4');
    h1TopBannerHeading.textContent = 'Weather Provider';
    const form = createElement('form');
    addClasses(form, 'mb-3');
    form.id = 'search-form';
    const label = createElement('label');
    addClasses(label, 'form-label');
    label.setAttribute('for', 'city-search');
    label.textContent = '';
    const input = createElement('input');
    addClasses(input, 'form-control');
    input.type = 'text';
    input.id = 'city-search';
    input.placeholder = 'Enter city name';
    input.required = true;
    input.autofocus = true;
    input.setAttribute('aria-label', 'City search field');
    const button = createElement('button');
    addClasses(button, 'btn btn-outline-danger');
    button.type = 'submit';
    button.setAttribute('aria-label', 'Submit button');
    button.textContent = 'Search ';
    // Create <i> element for FontAwesome icon
    const iconSubmit = createElement('i', 'fas fa-search');
    // Add the icon as a child of the submit button
    button.appendChild(iconSubmit);
    const spanMsg = createElement('span', 'msg');
    addClasses(spanMsg, 'form-text');
    spanMsg.setAttribute('role', 'alert');

    // Add an error box
    const errorBox = createElement('div', 'alert alert-danger');
    errorBox.id = 'error-box';
    errorBox.style.display = 'none'; // Initially hide the error box
    errorBox.setAttribute('role', 'alert');
    errorBox.textContent = '';

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    form.appendChild(spanMsg);
    form.appendChild(errorBox); // Add the error box to the form

    // Add elements inside divTopBannerContainer
    appendChildren(divTopBannerContainer, [divApi, h1TopBannerHeading, form]);
    // Add divTopBannerContainer inside sectionTopBanner
    sectionTopBanner.appendChild(divTopBannerContainer);

    // Create elements for the Ajax section
    const sectionAjax = createElement('section', 'ajax-section');
    const divAjaxContainer = createElement('div', 'container');
    const ulCities = createElement('ul', 'cities');
    addClasses(ulCities, 'list-group');
    ulCities.setAttribute('aria-label', 'List of cities');
    divAjaxContainer.appendChild(ulCities);
    sectionAjax.appendChild(divAjaxContainer);
    // Add elements to the document
    appendChildren(main, [sectionTopBanner, sectionAjax]);

    // Function to make request to OpenWeather API
    function searchWeather(city) {
        const apiKey = 'f8f87f167d2b7b59f54ca69f4fb82e2b'; // OpenWeather API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                // Process the data and display in the app
                console.log(data); // Example: logging the data to console

                // Extract relevant information from the data object
                const weatherData = {
                    iconCode: data.weather[0].icon, // Weather icon code
                    temperature: (data.main.temp - 273.15).toFixed(1), // Temperature in Celsius
                    description: data.weather[0].description, // Weather description
                };

                // Get the icon code returned by OpenWeather API
                const iconCode = data.weather[0].icon;

                // Update the interface with weather details
                const weatherDetails = createElement('div');
                addClasses(weatherDetails, 'city-info text-light p-3 rounded');
                weatherDetails.innerHTML = `
                    <h2>${city}</h2>
                    <p class="font-weight-bold">Temperature: ${weatherData.temperature} °C</p>
                    <p class="font-italic">Description: ${weatherData.description}</p>
                `;

                // Create a container to center the icon and city response
                const iconAndDetailsContainer = createElement('div');
                iconAndDetailsContainer.style.textAlign = 'text-center'; // Center elements inside container

                // Clear the list of cities before adding new results
                ulCities.innerHTML = '';

                // Add weather details to the list of cities
                ulCities.appendChild(weatherDetails);
                ulCities.appendChild(iconAndDetailsContainer);

                // Add the corresponding weather icon to the list of cities
                const weatherIcon = createElement('img');
                weatherIcon.src = iconMap[iconCode] || 'https://bmcdn.nl/assets/weather-icons/v2.0/line/unknown.svg';
                weatherIcon.alt = 'Weather Icon';
                weatherIcon.height = '48';
                ulCities.appendChild(weatherIcon);
                iconAndDetailsContainer.appendChild(weatherIcon);
            })
            .catch(error => {
                console.error('Error:', error);
                displayError('Failed to fetch weather data. Please try again later.');
            });
    }

    // Function to handle form submission
    function validateForm(event) {
        event.preventDefault(); // Prevent form submission by default

        hideError(); // Hide the error message if being displayed

        var input = document.getElementById('city-search').value;
        var pattern = /^[a-zA-Z\s]+$/; // Pattern: only letters and spaces
        if (!pattern.test(input)) {
            displayError('Please enter a valid city name.');
            return false; // Prevent form submission if validation fails
        }

        searchWeather(input);
    }

    // Add submit event to the form to call the validation function
    document.getElementById('search-form').addEventListener('submit', validateForm);
});
