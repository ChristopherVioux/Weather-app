let weather = {
    "apiKey": "50ed1f1107d6f30a31d623d3c36c438f",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city 
        + "&units=metric&appid=" + this.apiKey
        + "&lang=fr"
          )
          .then((res) => res.json())
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Météo à " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText =
        "Humidité: " + humidity + "%";
        document.querySelector(".wind").innerText =
        "Vitesse du vent: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if(e.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Paris");