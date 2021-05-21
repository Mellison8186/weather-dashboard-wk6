var todayFormEl = document.querySelector("#today");
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

var getWeather = function() {
    var city = cityInputEl.value
    // format openweather api
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=347f66e450d278751c4972d1d179a00f";
    
    //make a request to the URL
fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
        displayWeather(data)
    });

    searchHistory.push(city)
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
});
};

var displayWeather = function(data) {
    document.querySelector("#today").textContent = data.name
}
var historyBtn = function() {
    for (let i=0; i < searchHistory.length; i++) {
        var cityButton = document.createElement("button")
        cityButton.textContent = searchHistory[i];
        document.querySelector("#search-form").append(cityButton);

        cityButton.addEventListener("click", function(){
            cityInputEl.value = this.textContent
            getWeather()
        });
    }
}

var formSubmitHander = function(event) {
    event.preventDefault();
    console.log(event);

    getWeather()
    
};

historyBtn();
searchFormEl.addEventListener("submit", formSubmitHander);