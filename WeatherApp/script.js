document.getElementById('search').addEventListener('click', function() {
    const city = document.getElementById('city').value;

    const coordinates = {
        'New York': { lat: 40.7128, lon: -74.0060 },
        'Los Angeles': { lat: 34.0522, lon: -118.2437 },
        'London': { lat: 51.5074, lon: -0.1278 },
        'Paris': { lat: 48.8566, lon: 2.3522 },
        'Tokyo': { lat: 35.6895, lon: 139.6917 },
        'Beijing': { lat: 39.9042, lon: 116.4074 },
        'Moscow': { lat: 55.7558, lon: 37.6173 },
        'Berlin': { lat: 52.5200, lon: 13.4050 },
        'Sydney': { lat: -33.8688, lon: 151.2093 },
        'São Paulo': { lat: -23.5505, lon: -46.6333 },
        'Cairo': { lat: 30.0444, lon: 31.2357 },
        'Johannesburg': { lat: -26.2041, lon: 28.0473 },
        'Mumbai': { lat: 19.0760, lon: 72.8777 },
        'Toronto': { lat: 43.6511, lon: -79.3832 },
        'Mexico City': { lat: 19.4326, lon: -99.1332 },
        'Buenos Aires': { lat: -34.6037, lon: -58.3816 },
        'Istanbul': { lat: 41.0082, lon: 28.9784 },
        'Rome': { lat: 41.9028, lon: 12.4964 },
        'Dubai': { lat: 25.2760, lon: 55.2962 },
        'Seoul': { lat: 37.5665, lon: 126.9780 }
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