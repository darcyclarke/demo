# 🌤️ WeatherNews

A simple command-line tool to get weather information for any city around the world.

## 🚀 Quick Start

```bash
# Using vlx (recommended)
vlx weathernews "New York"
vlx weathernews London
vlx weathernews Tokyo
```

## 📦 Installation

### Option 1: Use directly with vlx (No installation required)
```bash
vlx weathernews <city>
```

### Option 2: Install globally
```bash
vlt install -g weathernews
weathernews <city>
```

### Option 3: Clone and use locally
```bash
git clone <repository-url>
cd weathernews
vlt install
vlt link  # Makes it available globally
weathernews <city>
```

## 🚀 No Setup Required!

This tool uses the completely free Open-Meteo API - **no API key required!** Just install and use immediately.

**✅ Completely free**  
**✅ No registration needed**  
**✅ No API key required**  
**✅ Unlimited usage**

Data provided by [Open-Meteo.com](https://open-meteo.com) - an open-source weather API.

## 💡 Usage Examples

```bash
# Single word cities
weathernews London
weathernews Tokyo
weathernews Paris

# Cities with spaces (use quotes)
weathernews "New York"
weathernews "Los Angeles"
weathernews "San Francisco"

# International cities
weathernews Mumbai
weathernews "São Paulo"
weathernews Berlin

# Get help
weathernews --help
weathernews -h
```

## 📊 Sample Output

```
🔍 Fetching weather data for "London"...

🌍 Weather in London, United Kingdom
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌡️  Temperature: 15°C (59°F)
🌡️  Feels like:  13°C (55°F)
📊 Condition:    Partly cloudy
💧 Humidity:     72%
🌬️  Wind:        12 km/h
📈 Pressure:     1013 hPa

⛅ Partly cloudy

📅 7-Day Forecast
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☀️ Today     Clear sky
   High: 18°C (64°F)  Low: 12°C (54°F)
   🌞 No rain  🌬️  Wind: 15 km/h

🌤️ Tomorrow  Mainly clear
   High: 20°C (68°F)  Low: 14°C (57°F)
   🌞 No rain  🌬️  Wind: 12 km/h

⛅ Wednesday Partly cloudy
   High: 17°C (63°F)  Low: 11°C (52°F)
   💧 Rain: 2.1mm  🌬️  Wind: 18 km/h

🌧️ Thursday  Moderate rain
   High: 15°C (59°F)  Low: 9°C (48°F)
   💧 Rain: 8.7mm  🌬️  Wind: 22 km/h
```

## 🛠️ Features

- ✅ Works with `vlx` - no installation required
- ✅ Beautiful, colorful command-line output with emojis
- ✅ **Current weather conditions with detailed information**
- ✅ **7-day weather forecast with daily high/low temperatures**
- ✅ **Precipitation and wind information for each day**
- ✅ Temperature in both Celsius and Fahrenheit
- ✅ Comprehensive weather data (humidity, wind, pressure)
- ✅ Proper error handling with helpful messages
- ✅ Support for cities with spaces in names
- ✅ No API key or registration required
- ✅ Cross-platform compatibility

## 🔧 Requirements

- Node.js 14.0.0 or higher
- Internet connection

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## ⚠️ Notes

- The tool requires an active internet connection
- Open-Meteo API is completely free with no rate limits for normal usage
- City names are case-insensitive
- For cities with common names, the API will return the most populous match

## 🆘 Troubleshooting

### "City not found" error
- Check the spelling of the city name
- Try using the full city name or include the country (e.g., "Paris, FR")
- Some very small towns might not be in the database

### API connection errors
- No API key is required for this service
- The Open-Meteo API is free and has no authentication

### Network errors
- Check your internet connection
- Some corporate networks might block the API calls
- Try again after a few moments 