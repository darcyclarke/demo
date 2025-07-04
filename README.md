# 🌤️ Weatherin

A simple command-line tool to get weather information for any city around the world.

## 🚀 Quick Start

```bash
# Using npx (recommended)
npx weatherin "New York"
npx weatherin London
npx weatherin Tokyo

# Using vlx
vlx weatherin "Los Angeles"
```

## 📦 Installation

### Option 1: Use directly with npx (No installation required)
```bash
npx weatherin <city>
```

### Option 2: Install globally
```bash
npm install -g weatherin
weatherin <city>
```

### Option 3: Clone and use locally
```bash
git clone <repository-url>
cd weatherin
npm install
npm link  # Makes it available globally
weatherin <city>
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
weatherin London
weatherin Tokyo
weatherin Paris

# Cities with spaces (use quotes)
weatherin "New York"
weatherin "Los Angeles"
weatherin "San Francisco"

# International cities
weatherin Mumbai
weatherin "São Paulo"
weatherin Berlin

# Get help
weatherin --help
weatherin -h
```

## 📊 Sample Output

```
🔍 Fetching weather data for "London"...

🌍 Weather in London
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌡️  Temperature: 15°C (59°F)
🌡️  Feels like:  13°C (55°F)
📊 Condition:    Partly cloudy
💧 Humidity:     72%
🌬️  Wind:        12 km/h
📈 Pressure:     1013 hPa

⛅ Partly cloudy
```

## 🛠️ Features

- ✅ Works with `npx` and `vlx` - no installation required
- ✅ Beautiful, colorful command-line output with emojis
- ✅ Temperature in both Celsius and Fahrenheit
- ✅ Comprehensive weather data (humidity, wind, pressure, visibility)
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