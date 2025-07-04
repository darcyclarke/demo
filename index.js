#!/usr/bin/env node

const axios = require('axios');

// Free Open-Meteo API - no API key required!
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

function displayHelp() {
  console.log(`
🌤️  Weatherin - Get weather information for any city

Usage:
  npx weatherin <city>
  vlx weatherin <city>

Examples:
  npx weatherin "New York"
  npx weatherin London
  npx weatherin Tokyo

Features:
  • Current weather conditions
  • 7-day weather forecast
  • Temperature in both Celsius and Fahrenheit

Note: This tool uses Open-Meteo API - completely free with no API key required!
Data provided by Open-Meteo.com
  `);
}

function formatTemperature(celsius) {
  const fahrenheit = Math.round((celsius * 9/5) + 32);
  return `${Math.round(celsius)}°C (${fahrenheit}°F)`;
}

function formatDayOfWeek(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
}

function formatForecastData(forecastData) {
  console.log(`
📅 7-Day Forecast
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  for (let i = 0; i < 7 && i < forecastData.daily.time.length; i++) {
    const day = formatDayOfWeek(forecastData.daily.time[i]);
    const condition = getWeatherCondition(forecastData.daily.weather_code[i]);
    const maxTemp = formatTemperature(forecastData.daily.temperature_2m_max[i]);
    const minTemp = formatTemperature(forecastData.daily.temperature_2m_min[i]);
    const precipitation = forecastData.daily.precipitation_sum[i] || 0;
    const windSpeed = Math.round(forecastData.daily.wind_speed_10m_max[i]);
    
    console.log(`
${condition.emoji} ${day.padEnd(9)} ${condition.description}
   High: ${maxTemp}  Low: ${minTemp}
   ${precipitation > 0 ? `💧 Rain: ${precipitation}mm` : '🌞 No rain'}  🌬️  Wind: ${windSpeed} km/h`);
  }
  console.log();
}

function formatWeatherData(locationData, weatherData) {
  const current = weatherData.current;
  const condition = getWeatherCondition(current.weather_code);
  
  console.log(`
🌍 Weather in ${locationData.name}, ${locationData.country}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌡️  Temperature: ${formatTemperature(current.temperature_2m)}
🌡️  Feels like:  ${formatTemperature(current.apparent_temperature)}
📊 Condition:    ${condition.description}
💧 Humidity:     ${current.relative_humidity_2m}%
🌬️  Wind:        ${current.wind_speed_10m} km/h
📈 Pressure:     ${current.surface_pressure} hPa

${condition.emoji} ${condition.description}`);

  // Display 7-day forecast
  formatForecastData(weatherData);
}

function getWeatherCondition(weatherCode) {
  // Open-Meteo weather codes mapping
  const weatherCodes = {
    0: { description: 'Clear sky', emoji: '☀️' },
    1: { description: 'Mainly clear', emoji: '🌤️' },
    2: { description: 'Partly cloudy', emoji: '⛅' },
    3: { description: 'Overcast', emoji: '☁️' },
    45: { description: 'Fog', emoji: '🌫️' },
    48: { description: 'Depositing rime fog', emoji: '🌫️' },
    51: { description: 'Light drizzle', emoji: '🌦️' },
    53: { description: 'Moderate drizzle', emoji: '🌦️' },
    55: { description: 'Dense drizzle', emoji: '🌧️' },
    56: { description: 'Light freezing drizzle', emoji: '🌨️' },
    57: { description: 'Dense freezing drizzle', emoji: '🌨️' },
    61: { description: 'Slight rain', emoji: '🌧️' },
    63: { description: 'Moderate rain', emoji: '🌧️' },
    65: { description: 'Heavy rain', emoji: '🌧️' },
    66: { description: 'Light freezing rain', emoji: '🌨️' },
    67: { description: 'Heavy freezing rain', emoji: '🌨️' },
    71: { description: 'Slight snow fall', emoji: '❄️' },
    73: { description: 'Moderate snow fall', emoji: '❄️' },
    75: { description: 'Heavy snow fall', emoji: '❄️' },
    77: { description: 'Snow grains', emoji: '❄️' },
    80: { description: 'Slight rain showers', emoji: '🌦️' },
    81: { description: 'Moderate rain showers', emoji: '🌧️' },
    82: { description: 'Violent rain showers', emoji: '🌧️' },
    85: { description: 'Slight snow showers', emoji: '🌨️' },
    86: { description: 'Heavy snow showers', emoji: '🌨️' },
    95: { description: 'Thunderstorm', emoji: '⛈️' },
    96: { description: 'Thunderstorm with slight hail', emoji: '⛈️' },
    99: { description: 'Thunderstorm with heavy hail', emoji: '⛈️' }
  };
  
  return weatherCodes[weatherCode] || { description: 'Unknown', emoji: '🌤️' };
}

async function getWeather(city) {
  try {
    console.log(`🔍 Fetching weather data for "${city}"...`);
    
    // Step 1: Get coordinates for the city
    const geocodingResponse = await axios.get(GEOCODING_URL, {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });

    if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
      console.error(`
❌ City not found: "${city}"
Please check the spelling or try a different city name.
Examples: "New York", "London", "Tokyo"
      `);
      process.exit(1);
    }

    const location = geocodingResponse.data.results[0];
    
    // Step 2: Get weather data using coordinates (current + 7-day forecast)
    const weatherResponse = await axios.get(WEATHER_URL, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'weather_code',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m'
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'wind_speed_10m_max',
          'wind_direction_10m_dominant'
        ].join(','),
        timezone: 'auto',
        forecast_days: 7
      }
    });

    formatWeatherData(location, weatherResponse.data);
    
  } catch (error) {
    if (error.response) {
      console.error(`❌ API Error: ${error.response.data.reason || error.response.statusText || 'Unknown error'}`);
    } else if (error.request) {
      console.error(`
❌ Network Error: Could not connect to weather service
Please check your internet connection and try again.
      `);
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    displayHelp();
    return;
  }

  const city = args.join(' '); // Join all arguments to handle cities with spaces
  
  if (!city.trim()) {
    console.error('❌ Please provide a city name');
    displayHelp();
    process.exit(1);
  }

  getWeather(city);
}

main(); 