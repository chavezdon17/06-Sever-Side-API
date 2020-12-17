var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var icn = document.querySelector(".icon");
var hum = document.querySelector(".hum");
var windSpeed = document.querySelector(".windSpeed");
var uvel = document.querySelector(".uvIndex");
var dayOne = document.querySelector(".dayOne");
var dayTwo = document.querySelector(".dayTwo");
var dayThree = document.querySelector(".dayThree");
var dayFour = document.querySelector(".dayFour");
var dayFive = document.querySelector(".dayFive");
var dayOneWeather = document.querySelector(".dayOneWeather");
var dayOneDesc = document.querySelector(".dayOneDesc");
var dayOneIcon = document.querySelector(".dayOneIcon");
var $cityButtonEl = $("#city-button-element");
var $recentSearchEl = $("#recent_searches");
var cityArr = [];

if (localStorage.getItem("primary")) {
  console.log(localStorage.getItem("primary"));
  cityArr = JSON.parse(localStorage.getItem("primary"));
}

function citySearch(cityName) {
  console.log(citySearch);
  var lat;
  var long;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=d99af31d18f58b92c977dbe59e43af60&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      //getting data
      console.log(data);
      var nameValue = data["name"];
      var tempValue = data["main"]["temp"];
      var descValue = data["weather"][0]["description"];
      var iconValue = data.weather[0]["icon"];
      var humidityValue = data["main"]["humidity"];
      var windSpeedValue = data.wind.speed;
      lat = data.coord.lat;
      long = data.coord.lon;
      console.log(humidityValue);
      console.log(hum.innerHTML);
      temp.innerHTML.replace(tempValue);
      desc.innerHTML.replace(descValue);
      icn.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + iconValue + "@2x.png"
      );
      console.log(icn);
      hum.innerHTML = humidityValue;
      windSpeed.innerHTML = windSpeedValue;
      console.log(windSpeedValue);

      fetch(
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=d99af31d18f58b92c977dbe59e43af60"
      )
        .then((response) => response.json())
        .then((uvIndex) => {
          console.log(uvIndex);
          var uvIndexValue = uvIndex.value;
          uvel.innerHTML = uvIndexValue;
        });

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          long +
          "&units=imperial&appid=d99af31d18f58b92c977dbe59e43af60"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.daily[0]);
          console.log(data.daily[1]);
          console.log(data.daily[2]);
          console.log(data.daily[3]);
          console.log(data.daily[4]);
          console.log(data.daily[5]);
          // var dailyWeatherValue = daily.weather;

          // var dailyWeatherIcon = daily.weather.icon;
          setDayData(dayOne, data.daily[0]);
          setDayData(dayTwo, data.daily[1]);
          setDayData(dayThree, data.daily[2]);
          setDayData(dayFour, data.daily[3]);
          setDayData(dayFive, data.daily[4]);
        });
    });
}
button.addEventListener("click", function () {
  citySearch(inputValue.value);
  var cityArray = [inputValue.value, ...cityArr];
  cityArr = cityArray;
  //   function save(data) {
  localStorage.setItem("primary", JSON.stringify(cityArr));
});
// .catch((err) => alert("Wrong city name!"));
function setDayData(day, data) {
  day.innerHTML =
    data.weather[0].description +
    "\n daily min " +
    data.temp.min +
    "\n daily max " +
    data.temp.max;
}
//Loop through cityArray and create city buttons
for (var i = 0; i < cityArr.length; i++) {
  var $cityButton = document.createElement("button");
  console.log(cityArr);
  var cityName = cityArr[i];

  $cityButton.addEventListener("click", function () {
    console.log(cityArr[i]);
    citySearch($(this).text());
  });
  $cityButton.innerHTML = cityArr[i];
  // $cityButton.attr("class", "btn city-button");
  // $cityButton.attr("value", cityArr[i]);
  $cityButtonEl.append($cityButton).append("<br>");
}
