const API_KEY = "ee03ad02481914e920b2e6b2a25daec8"; // API key OpenWeatherMap

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeatherByLocation, showError);
  } else {
    document.getElementById("weatherResult").innerHTML =
      "Trình duyệt không hỗ trợ định vị.";
  }

  showFamousCitiesWeather();
};

// 🔹 Lấy thời tiết theo vị trí hiện tại
async function showWeatherByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=vi&appid=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);

    const icon = getWeatherIcon(data.weather[0].main);

    document.getElementById("weatherResult").innerHTML = `
      <div class="weather-card">
        <h3>${data.name}</h3>
        <p>${icon} ${data.weather[0].description}</p>
        <p><b>${data.main.temp}°C</b></p>
        <p>Độ ẩm: ${data.main.humidity}%</p>
      </div>
    `;
  } catch (err) {
    document.getElementById("weatherResult").innerHTML = `<p class="error">Không thể lấy dữ liệu: ${err.message}</p>`;
  }
}

function showError(err) {
  document.getElementById("weatherResult").innerHTML = `<p class="error">Không thể lấy vị trí: ${err.message}</p>`;
}
async function showFamousCitiesWeather() {
  const cities = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho"];
  const container = document.getElementById("cityList");

  for (let city of cities) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&lang=vi&appid=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);

      const icon = getWeatherIcon(data.weather[0].main);

      const cityCard = document.createElement("div");
      cityCard.className = "city-card";
      cityCard.innerHTML = `
        <h4>${data.name}</h4>
        <p>${icon} ${data.weather[0].description}</p>
        <p><b>${data.main.temp}°C</b></p>
      `;
      container.appendChild(cityCard);
    } catch (error) {
      console.error(`Lỗi khi tải dữ liệu cho ${city}:`, error);
    }
  }
}

// 🔹 Icon theo loại thời tiết
function getWeatherIcon(main) {
  switch (main) {
    case "Clear": return "☀️";
    case "Clouds": return "☁️";
    case "Rain": return "🌧️";
    case "Drizzle": return "🌦️";
    case "Thunderstorm": return "⛈️";
    case "Snow": return "❄️";
    case "Mist":
    case "Fog":
    case "Haze":
      return "🌫️";
    default: return "🌍";
  }
}