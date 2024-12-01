document.getElementById('search').addEventListener('click', function() {
    const city = document.getElementById('city').value;

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

function getWeatherDescription(weathercode) {
    const weatherDescriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Drizzle: Light',
        53: 'Drizzle: Moderate',
        55: 'Drizzle: Dense intensity',
        56: 'Freezing Drizzle: Light',
        57: 'Freezing Drizzle: Dense intensity',
        61: 'Rain: Slight',
        63: 'Rain: Moderate',
        65: 'Rain: Heavy intensity',
        66: 'Freezing Rain: Light',
        67: 'Freezing Rain: Heavy intensity',
        71: 'Snow fall: Slight',
        73: 'Snow fall: Moderate',
        75: 'Snow fall: Heavy intensity',
        77: 'Snow grains',
        80: 'Rain showers: Slight',
        81: 'Rain showers: Moderate',
        82: 'Rain showers: Violent',
        85: 'Snow showers: Slight',
        86: 'Snow showers: Heavy',
        95: 'Thunderstorm: Slight or moderate',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };

    return weatherDescriptions[weathercode] || 'Unknown weather';
}