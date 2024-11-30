document.getElementById('search').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'your_api_key'; // Replace with OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }

            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <div class="weather-info">
                    <h2>${data.name}</h2>
                    <p>${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});