const API_KEY = "a561ac9370b45d737811c14263ff46a3";

// Khi nhấn nút "Xem thời tiết khu vực"
document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const region = document.getElementById("region").value.trim();
  const resultDiv = document.getElementById("regionResult");

  if (!region) {
    resultDiv.innerHTML = "<p>⚠️ Vui lòng nhập tên khu vực!</p>";
    return;
  }

  resultDiv.innerHTML = "<p>⏳ Đang tải dữ liệu...</p>";

  try {
    // Lấy tọa độ từ API geocoding
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${region}&limit=1&appid=${API_KEY}`);
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      resultDiv.innerHTML = "<p>❌ Không tìm thấy khu vực này.</p>";
      return;
    }

    const { lat, lon, name, country } = geoData[0];
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=vi&appid=${API_KEY}`);
    const weatherData = await weatherRes.json();

    const icon = weatherData.weather[0].icon;
    const desc = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;

    resultDiv.innerHTML = `
      <div class="weather-card">
        <h3>${name}, ${country}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p><strong>Nhiệt độ:</strong> ${temp}°C</p>
        <p><strong>Độ ẩm:</strong> ${humidity}%</p>
        <p><strong>Tốc độ gió:</strong> ${wind} m/s</p>
      </div>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p>⚠️ Lỗi: ${err.message}</p>`;
  }
});

// -------------------------------------------
// 🔹 Hiển thị thời tiết cho các thành phố nổi tiếng
// -------------------------------------------
window.onload = function () {
  showFamousCitiesWeather();
};

async function showFamousCitiesWeather() {
  const cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];
  const container = document.getElementById("cityList");

  for (let city of cities) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&lang=vi&appid=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);

      const icon = data.weather[0].icon;
      const desc = data.weather[0].description;
      const temp = data.main.temp;

      const cityCard = document.createElement("div");
      cityCard.className = "city-card";
      cityCard.innerHTML = `
        <h4>${data.name}</h4>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p><b>${temp}°C</b></p>
      `;
      container.appendChild(cityCard);
    } catch (error) {
      console.error(`Lỗi khi tải dữ liệu cho ${city}:`, error);
    }
  }
}
