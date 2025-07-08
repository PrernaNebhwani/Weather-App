// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const cityInput = document.getElementById("city");

  // When search button is clicked
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();

    if (cityName !== "") {
      fetchWeather(cityName);
    } else {
      alert("Please enter a city name.");
    }
  });
});

async function fetchWeather(city) {
   const url=`https://api.weatherapi.com/v1/current.json?key=2ca0e385083049caa33154936252505&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result); // For debug
    // console.log("Humidity:", result.current.humidity);
    // console.log("Feelslike C:", result.current.feelslike_c);
    document.getElementById("cityName").innerHTML = city;

    document.getElementById("temp_c").innerHTML = result.current.temp_c;
    document.getElementById("temp_c2").innerHTML = result.current.temp_c;
    document.getElementById("temp_f").innerHTML = result.current.temp_f;
    document.getElementById("wind_mph").innerHTML = result.current.wind_mph;
    document.getElementById("wind_mph2").innerHTML = result.current.wind_mph;
    document.getElementById("wind_kph").innerHTML = result.current.wind_kph;
    document.getElementById("wind_degree").innerHTML = result.current.wind_degree;
    document.getElementById("pressure_in").innerHTML = result.current.pressure_in;
    document.getElementById("humidity").innerHTML = result.current.humidity;
    document.getElementById("feelslike_c").innerHTML = result.current.feelslike_c;
    document.getElementById("feelslike_c2").innerHTML = result.current.feelslike_c;
    document.getElementById("feelslike_f").innerHTML = result.current.feelslike_f;
    const iconUrl = "https:" + result.current.condition.icon;
    document.getElementById("weather-icon").src = iconUrl;

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
async function fillCityRow(city) {
  const apiKey = "2ca0e385083049caa33154936252505";
  const row = document.getElementById(`row-${city}`);
  if (!row) return;

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const current = result.current;

    row.innerHTML = `
      <th scope="row" class="text-start">${city}</th>
      <td>${current.temp_c}°C</td>
      <td>${current.temp_f}°F</td>
      <td>${current.humidity}%</td>
      <td>${current.feelslike_c}°C</td>
      <td>${current.feelslike_f}°F</td>
      <td>${current.pressure_in}</td>
      <td>${current.wind_degree}°</td>
      <td>${current.wind_mph} mph</td>
      <td>${current.wind_kph} km/h</td>
    `;
  } catch (error) {
    console.error(`Error loading data for ${city}`, error);
    row.innerHTML = `
      <th scope="row" class="text-start">${city}</th>
      <td colspan="9" style="color: red">Failed to load</td>
    `;
  }
}
const cities = ["Bangalore", "Mumbai", "Lucknow", "Delhi", "Kolkata"];
cities.forEach(city => fillCityRow(city));
