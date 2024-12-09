const apiKey = '59887469a6364787afc83529240612';
const city = document.getElementById('city-input').value.trim();


// Fetch weather data for a city
async function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data not found');
    return await response.json();
  } catch (error) {
    console.error(error.message);
    alert('Unable to fetch weather data. Please try again.');
  }
}

// Convert date to day name
function getDayName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Update weather cards
function updateWeatherCards(data) {
  const cardsContainer = document.getElementById('weather-cards');
  cardsContainer.innerHTML = '';

  data.forecast.forecastday.forEach((day) => {
    const dayName = getDayName(day.date);
    const city = document.getElementById('city-input').value.trim();
    const cardHTML = `
            <div class="weather-card">
                <h2>${city}</h2>
                <h3>${dayName}</h3>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p>${day.day.condition.text}</p>
                <p><i class="fa-solid fa-temperature-high"></i> : ${day.day.maxtemp_c}°C</p>
                <p><i class="fa-solid fa-temperature-low"></i> : ${day.day.mintemp_c}°C</p>
                <p><i class="fa-solid fa-umbrella"></i> : ${day.day.avghumidity}%</p>
                <p><i class="fa-solid fa-wind"></i> : ${day.day.maxwind_kph} km/h</p>
            </div>
        `;
    cardsContainer.innerHTML += cardHTML;
  });
}

// Search weather by city
document.getElementById('search-button').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    const data = await fetchWeather(city);
    if (data) updateWeatherCards(data);
  } else {
    alert('Please enter a city name.');
  }
});


// Initialize with a default city
document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchWeather('New York'); // Default city
  if (data) updateWeatherCards(data);
});
