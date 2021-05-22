var todayFormEl = document.querySelector("#today");
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

var getWeather = function () {
  var city = cityInputEl.value;
  // format openweather api
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=347f66e450d278751c4972d1d179a00f";

  //make a request to the URL
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayWeather(data);
    });

    searchHistory.push(city);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
  });
};

// Display today's weather
var displayWeather = function (data) {
  (document.querySelector("#today").textContent = data.name),
    (document.querySelector("#item1").textContent =
      `Temp: ` + data.main.temp + `˚F`),
    (document.querySelector("#item2").textContent =
      `Wind: ` + data.wind.speed + ` MPH`),
    (document.querySelector("#item3").textContent =
      `Humidity: ` + data.main.humidity + `%`);
};

//function to fetch 5-day forecast
var fiveDays = function () {
  var forecast = cityInputEl.value;
  // format openweather api
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + forecast + "&units=imperial&appid=347f66e450d278751c4972d1d179a00f";

  //make a request to the URL
  fetch(forecastUrl).then(function (response) {
    response.json().then(function (info) {
        console.log(info)
      fiveDayForecast(info);
      uvI(info.city.coord.lat, info.city.coord.lon)
    });
  });
};

var uvI = function (lat, long) {
    console.log(lat, long)
    var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=347f66e450d278751c4972d1d179a00f";

    fetch(uvIndex).then(function (response) {
        response.json().then(function (info) {
            console.log(info)
        const uv = document.getElementById("item4")
        uv.textContent = "UV Index: " + info.current.uvi
        })
    })
}

//display 5-day forecast
var fiveDayForecast = function (info) {
    const unixDT = info.list[7].dt;
    let current = dayjs.unix(unixDT).format('M/D/YYYY');
    console.log(current);
    [
      (document.querySelector("#d1").textContent = current),
      (document.querySelector("#icon1").textContent = info.list[7].weather[0].icon),
      (document.querySelector("#temp1").textContent = info.list[7].wind.speed),
      (document.querySelector("#wind1").textContent = info.list[7].dt_text),
      (document.querySelector("#humid1").textContent = info.list[7].main.humidity)
    ],
    [
      (document.querySelector("#d2").textContent = current),
      (document.querySelector("#icon2").textContent = info.list[14].weather[0].icon),
      (document.querySelector("#temp2").textContent = info.list[14].wind.speed),
      (document.querySelector("#wind2").textContent = info.list[14].dt_text),
      (document.querySelector("#humid2").textContent = info.list[14].main.humidity),
    ],
    [
        (document.querySelector("#d3").textContent = current),
        (document.querySelector("#icon3").textContent = info.list[21].weather[0].icon),
        (document.querySelector("#temp3").textContent = info.list[21].wind.speed),
        (document.querySelector("#wind3").textContent = info.list[21].dt_text),
        (document.querySelector("#humid3").textContent = info.list[21].main.humidity),
      ],
      [
        (document.querySelector("#d4").textContent = current),
        (document.querySelector("#icon4").textContent = info.list[28].weather[0].icon),
        (document.querySelector("#temp4").textContent = info.list[28].wind.speed),
        (document.querySelector("#wind4").textContent = info.list[28].dt_text),
        (document.querySelector("#humid4").textContent = info.list[28].main.humidity),
      ],
      [
        (document.querySelector("#d5").textContent = current),
        (document.querySelector("#icon5").textContent = info.list[35].weather[0].icon),
        (document.querySelector("#temp5").textContent = info.list[35].wind.speed),
        (document.querySelector("#wind5").textContent = info.list[35].dt_text),
        (document.querySelector("#humid5").textContent = info.list[35].main.humidity),
      ]
};

//save history to local storage and display weather when clicked
var historyBtn = function () {
  for (let i = 0; i < searchHistory.length; i++) {
    var cityButton = document.createElement("button");
    cityButton.textContent = searchHistory[i];
    document.querySelector("#search-form").append(cityButton);

    cityButton.addEventListener("click", function () {
      cityInputEl.value = this.textContent;
    });
  }
};

var formSubmitHander = function (event) {
  event.preventDefault();

  getWeather();
  fiveDays();
};

historyBtn();
searchFormEl.addEventListener("submit", formSubmitHander);