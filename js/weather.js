var todayFormEl = document.querySelector(`#today`);
var searchFormEl = document.querySelector(`#search-form`);
var cityInputEl = document.querySelector(`#city-input`);
var searchHistory = JSON.parse(localStorage.getItem(`search-history`)) || [];

// function to for today's weather conditions
var getWeather = function () {
  var city = cityInputEl.value;
  // format openweather api
  var apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&units=imperial&appid=347f66e450d278751c4972d1d179a00f`;

  //make a request to the URL
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayWeather(data);
    });

    searchHistory.push(city);
    localStorage.setItem(`search-history`, JSON.stringify(searchHistory));
  });
};

// Display today's weather
var displayWeather = function (data) {
  console.log(data);
  (document.querySelector(`#today`).textContent = data.name),
(document.querySelector(`#item1`).textContent = `Temp: ` + data.main.temp + `˚F`),
    (document.querySelector(`#item2`).textContent = `Wind: ` + data.wind.speed + ` MPH`),
    (document.querySelector(`#item3`).textContent = `Humidity: ` + data.main.humidity + `%`);
// Today's icon
var todayIcon = `https://openweathermap.org/img/w/` + data.weather[0].icon + `.png`;
    (document.querySelector(`#tIcon`).src = todayIcon);
// convert from unix time to m/d/yyyy date
const day0 = data.dt;
let todaysDate = dayjs.unix(day0).format('M/D/YYYY');
(document.querySelector(`#todaysDate`).textContent = todaysDate);
};

// function for today's UV Index
var uvI = function (lat, long) {
    var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=347f66e450d278751c4972d1d179a00f";

// make URL request and show UV Index
    fetch(uvIndex).then(function (response) {
        response.json().then(function (info) {
        const uv = document.getElementById("item4")
        uv.textContent = "UV Index: " + info.current.uvi;
        if (info.current.uvi <= 4.9) {
          uv.classList.add("alert-success");
          uv.classList.remove("alert-warning")
          uv.classList.remove("alert-danger")
        }
        else if (info.current.uvi >= 5 && info.current.uvi <= 7.8) {
          uv.classList.add("alert-warning");
        uv.classList.remove("alert-success")
        uv.classList.remove("alert-danger")
        }
        else if (info.current.uvi >= 7.9) {
          uv.classList.add("alert-danger");
          uv.classList.remove("alert-success")
          uv.classList.remove("alert-warning")
        }
    });
});
};

//function to fetch 5-day forecast
var fiveDays = function () {
  var forecast = cityInputEl.value;
  // format openweather api
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=` + forecast + `&units=imperial&appid=347f66e450d278751c4972d1d179a00f`;
  //make a request to the URL
  fetch(forecastUrl).then(function (response) {
    response.json().then(function (info) {
      fiveDayForecast(info);
      uvI(info.city.coord.lat, info.city.coord.lon);
      icon(info)
    });
  });
};

// function for icons
var icon = function (info) {
    var iconOne = `https://openweathermap.org/img/w/` + info.list[7].weather[0].icon + `.png`;
document.querySelector(`#icon1`).src = iconOne;

var iconTwo = `https://openweathermap.org/img/w/` + info.list[14].weather[0].icon + `.png`;
document.querySelector(`#icon2`).src = iconTwo;

var iconThree = `https://openweathermap.org/img/w/` + info.list[21].weather[0].icon + `.png`;
document.querySelector(`#icon3`).src = iconThree;

var iconFour = `https://openweathermap.org/img/w/` + info.list[28].weather[0].icon + `.png`;
document.querySelector(`#icon4`).src = iconFour;

var iconFive = `https://openweathermap.org/img/w/` + info.list[35].weather[0].icon + `.png`;
document.querySelector(`#icon5`).src = iconFive;
};

// 5-Day forecast function
var fiveDayForecast = function (info) {
    // convert from unix time to m/d/yyyy date
    const day1 = info.list[7].dt;
    let date1 = dayjs.unix(day1).format('M/D/YYYY');

    const day2 = info.list[14].dt;
    let date2 = dayjs.unix(day2).format('M/D/YYYY');

    const day3 = info.list[21].dt;
    let date3 = dayjs.unix(day3).format('M/D/YYYY');

    const day4 = info.list[28].dt;
    let date4 = dayjs.unix(day4).format('M/D/YYYY');

    const day5 = info.list[35].dt;
    let date5 = dayjs.unix(day5).format('M/D/YYYY');

//display 5-day forecast
    [
      (document.querySelector(`#d1`).textContent = date1),
      (document.querySelector(`#temp1`).textContent = `Temp: ` + info.list[7].main.temp + `˚F`),
      (document.querySelector(`#wind1`).textContent = `Wind: ` + info.list[7].wind.speed + `MPH`),
      (document.querySelector(`#humid1`).textContent = `Humidity: ` + info.list[7].main.humidity + `%`)
    ],
    [
      (document.querySelector(`#d2`).textContent = date2),
      (document.querySelector(`#temp2`).textContent = `Temp: ` + info.list[14].main.temp + `˚F`),
      (document.querySelector(`#wind2`).textContent = `Wind: ` + info.list[14].wind.speed + `MPH`),
      (document.querySelector(`#humid2`).textContent = `Humidity: ` + info.list[14].main.humidity + `%`),
    ],
    [
        (document.querySelector(`#d3`).textContent = date3),
        (document.querySelector(`#temp3`).textContent = `Temp: ` + info.list[21].main.temp + `˚F`),
        (document.querySelector(`#wind3`).textContent = `Wind: ` + info.list[21].wind.speed + `MPH`),
        (document.querySelector(`#humid3`).textContent = `Humidity: ` + info.list[21].main.humidity + `%`),
      ],
      [
        (document.querySelector(`#d4`).textContent = date4),
        (document.querySelector(`#temp4`).textContent = `Temp: ` + info.list[28].main.temp + `˚F`),
        (document.querySelector(`#wind4`).textContent = `Wind: ` + info.list[28].wind.speed + `MPH`),
        (document.querySelector(`#humid4`).textContent = `Humidity: ` + info.list[28].main.humidity + `%`),
      ],
      [
        (document.querySelector(`#d5`).textContent = date5),
        (document.querySelector(`#temp5`).textContent = `Temp: ` + info.list[35].main.temp + `˚F`),
        (document.querySelector(`#wind5`).textContent = `Wind: ` + info.list[35].wind.speed + `MPH`),
        (document.querySelector(`#humid5`).textContent = `Humidity: ` + info.list[35].main.humidity + `%`),
      ]
};

//save history to local storage and display weather when clicked
var historyBtn = function () {
  for (let i = 0; i < searchHistory.length; i++) {
    var cityButton = document.createElement(`button`);
    cityButton.textContent = searchHistory[i];
    document.querySelector(`#search-form`).append(cityButton);

    cityButton.addEventListener(`click`, function () {
      cityInputEl.value = this.textContent;
    });
  }
};

var formSubmitHander = function (event) {
  event.preventDefault();

  getWeather();
  fiveDays();
};
historyBtn()
searchFormEl.addEventListener(`submit`, formSubmitHander);