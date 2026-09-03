# 🌤 Smart City Data Dashboard

> **AI-Powered Smart City Monitoring Platform** — A modern dashboard for real-time weather, air quality monitoring, intelligent environmental insights, and data visualization.

---

## 📌 Overview

Smart City Data Dashboard is a responsive web application that combines live weather information, air quality monitoring, trend analytics, and an AI-powered assistant into a single intuitive dashboard.

Designed with a clean, futuristic UI, the platform helps users monitor environmental conditions, compare cities, visualize trends, and receive intelligent recommendations for healthier and smarter daily decisions.

---

# ✨ Features

| Feature | Description |
|---------|-------------|
| 🌦 Live Weather | Search any city or town and view real-time weather information |
| 🌍 Air Quality Monitoring | Displays user-friendly AQI status (Good, Moderate, Poor) |
| 📈 Trend Analytics | Weekly & Monthly Weather and AQI charts |
| 🤖 AI Assistant | Ask weather and environmental questions using natural language |
| 💡 Smart Tips | AI-generated weather & air quality recommendations |
| 🔍 Smart Search | Autocomplete with Karnataka, Indian, and global cities |
| 🌙 Dark / Light Mode | Modern responsive UI with theme switching |
| 📱 Fully Responsive | Optimized for Desktop, Android & iOS |
| 🔄 Auto Refresh | Live environmental data updates |

---

# 🧠 AI Capabilities

The integrated AI assistant can answer questions such as:

- What's the weather in Bangalore right now?
- Compare air quality between Mysore and Delhi.
- Which city in Karnataka has the cleanest air this week?
- Is today suitable for outdoor activities?
- Give today's weather summary.

The assistant focuses primarily on Indian cities while supporting major international locations.

---

# 🏗 Architecture

```
User Search
      │
      ▼
City Validation
      │
      ├──────────────┐
      ▼              ▼
Weather API      AQI API
      │              │
      └──────┬───────┘
             ▼
      Data Processing
             ▼
      Dashboard UI
             ▼
 AI Insights & Smart Tips
             ▼
 Trend Charts & Analytics
```

---

# 🛠 Technologies Used

## Frontend

- React
- JavaScript
- HTML5
- CSS3
- Tailwind CSS

## APIs

- OpenWeatherMap API
- IQAir (AirVisual) API

## Visualization

- Chart.js

## AI

- Natural Language Query Processing
- Smart Recommendation Engine

## Tools

- Git
- GitHub
- VS Code

---

# 📊 Dashboard Modules

## 🌦 Weather Finder

- Real-time weather information
- Temperature
- Humidity
- Wind Speed
- Weather Conditions

---

## 🌍 Air Quality Indicator

Displays simplified AQI status:

- 🟢 Good
- 🟡 Moderate
- 🔴 Poor

---

## 📈 Trend Charts

Interactive charts showing:

- Weekly Weather Trends
- Monthly Weather Trends
- Weekly AQI Trends
- Monthly AQI Trends

---

## 🤖 AI Assistant

Interactive chatbot capable of answering environmental questions using live data.

---

## 💡 Smart Tips

AI-generated recommendations based on current environmental conditions.

Example:

> Air quality is moderate. Consider limiting prolonged outdoor activity.

---

# 📱 Responsive Design

Supports:

- Desktop
- Laptop
- Tablet
- Android
- iPhone

---

# 🚀 Future Enhancements

- User Authentication
- Favorite Cities
- Pollution Heatmaps
- Weather Forecast (7-Day)
- Disaster Alerts
- Smart Traffic Integration
- IoT Sensor Integration
- Satellite Weather Maps
- Voice Assistant
- Multi-language Support

---

# 📦 Installation

```bash
git clone https://github.com/yourusername/smart-city-dashboard.git

cd smart-city-dashboard

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file.

```
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY
VITE_IQAIR_API_KEY=YOUR_API_KEY
```

---

# 📂 Project Structure

```
Smart City Data Dashboard
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── assets/
│   └── App.jsx
│
├── package.json
├── README.md
└── vite.config.js
```

---

# 🎯 Learning Outcomes

During this project I learned:

- REST API Integration
- Real-Time Data Handling
- Dashboard UI Design
- Data Visualization
- Chart.js
- Responsive Web Design
- API Error Handling
- State Management
- AI-powered User Experience

---

# 📜 License

Academic Project © 2026

---

# 👨‍💻 Author

**Likith R**
**Mini Project**
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  **Fixed all the bugs**
