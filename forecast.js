// ========== Cấu hình ==========
const API_KEY = "a561ac9370b45d737811c14263ff46a3"; // 🔑 Thay bằng key OpenWeather của bạn
const lat = 21.0285; // Hà Nội
const lon = 105.8542;

// ========== Gọi API ==========
async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&lang=vi&appid=${API_KEY}`
    );
    const data = await res.json();

    showHourly(data.hourly);
    showDaily(data.daily);
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err);
    document.getElementById("hourly").innerHTML = "<p>Không thể tải dữ liệu</p>";
  }
}

// ========== Hiển thị theo giờ ==========
function showHourly(hourlyData) {
  const hourlyContainer = document.getElementById("hourly");
  hourlyContainer.innerHTML = "";

  hourlyData.slice(0, 12).forEach((h) => {
    const time = new Date(h.dt * 1000).getHours();
    const temp = Math.round(h.temp);
    const desc = h.weather[0].description;
    const icon = h.weather[0].icon;

    const card = `
      <div class="weather-card">
        <p><strong>${time}h</strong></p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        <p>${temp}°C</p>
        <p>${desc}</p>
      </div>
    `;
    hourlyContainer.innerHTML += card;
  });
}

// ========== Hiển thị theo ngày ==========
function showDaily(dailyData) {
  const dailyContainer = document.getElementById("daily");
  dailyContainer.innerHTML = "";

  dailyData.slice(0, 7).forEach((d) => {
    const date = new Date(d.dt * 1000).toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit"
    });
    const tempDay = Math.round(d.temp.day);
    const tempMin = Math.round(d.temp.min);
    const tempMax = Math.round(d.temp.max);
    const desc = d.weather[0].description;
    const icon = d.weather[0].icon;

    const card = `
      <div class="weather-card">
        <p><strong>${date}</strong></p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        <p>${tempDay}°C</p>
        <p>⬆ ${tempMax}° ⬇ ${tempMin}°</p>
        <p>${desc}</p>
      </div>
    `;
    dailyContainer.innerHTML += card;
  });
}

// ========== Gọi hàm khi tải trang ==========
getWeather();
