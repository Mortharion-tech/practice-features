document.getElementById('search').addEventListener('click', function() {
    const city = document.getElementById('city').value;

    // Sample coordinates for the city (replace these with actual coordinates)
    const coordinates = {
        'Berlin': { lat: 52.52, lon: 13.4050 },
        'Paris': { lat: 48.8566, lon: 2.3522 },
        'New York': { lat: 40.7128, lon: -74.0060 },
        // Add more cities as needed
    };

    if (!coordinates[city]) {
        alert('City not found');
        return;
    }

    const { lat, lon } = coordinates[city];
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(openMeteoUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            const { temperature, weathercode } = data.current_weather;
            const description = getWeatherDescription(weathercode);

            weatherDiv.innerHTML = `
                <div class="weather-info">
                    <h2>${city}</h2>
                    <p>${description}</p>
                    <p>Temperature: ${temperature}°C</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});