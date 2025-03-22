// footer date and time.
const currentYear = document.getElementById("currentyear");
let d = new Date();
currentYear.textContent = `©${d.getFullYear()}`;

const lastUpdated = document.getElementById("lastModified");
lastUpdated.textContent = `Last Modification: ${document.lastModified}`;

// weather info
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const windChill = document.getElementById("windChill");

const tempC = 10;
const windSp = 5;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * (windSpeed ** 0.16) + 0.3965 * temperature * (windSpeed ** 0.16);
}

let windCh = '';

if (tempC > 10 || windSp <= 4.8) {
    windCh = "N/A";
}
else {
    windCh = `${calculateWindChill(tempC, windSp).toFixed(2)} °C`;
}

temp.innerHTML = `<span class="label">Temperature:</span> <span class="value">${tempC} °C</span>`;
wind.innerHTML = `<span class="label">Wind:</span> <span class="value">${windSp} km/h</span>`;
windChill.innerHTML = `<span class="label">Wind Chill:</span> <span class="value">${windCh}</span>`;
