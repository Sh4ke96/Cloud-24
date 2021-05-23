let weather = {
    "apiKey": "1d873b30edaf261499ceccbd492cf2ff",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure} = data.main;
        const { speed } = data.wind;
        const { sunrise, sunset } = data.sys;
        document.querySelector(".current__location").innerText = name;
        document.querySelector(".current__temp").innerText = Math.round(temp) + "°";
        document.querySelector(".current__cloud").innerText = description;
        document.querySelector(".current__date").innerText = new Date (sunrise*1000).toLocaleDateString('en-US');
        document.querySelector(".current__icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".current__humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".current__wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".current__pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".current__sunrise").innerText = "Sunrise: " + new Date(sunrise*1000).toLocaleTimeString();
        document.querySelector(".current__sundown").innerText = "Sundown: " + new Date(sunset*1000).toLocaleTimeString();
        document.querySelector(".main__container").classList.remove("hidden");
    },
        search: function () {
            this.fetchWeather(document.querySelector(".main__search").value);
        }
};

document.querySelector(".main__icon").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".main__search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});