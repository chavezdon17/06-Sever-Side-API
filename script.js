var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var icn = document.querySelector(".icon");
var hum = document.querySelector(".hum");
var windSpeed = document.querySelector(".windSpeed");
var uvel = document.querySelector(".uvIndex");
var dayOne = document.querySelector(".fiveDayForcast");

var $cityButtonEl = $("#city-button-element");
var $recentSearchEl = $("#recent_searches");
var cityArr = [];

if (localStorage.getItem("response")) {
  cityArr = JSON.parse(localStorage.getItem("response"));
}

button.addEventListener("click", function () {
  var lat;
  var long;
  //   $.ajax({ get: quereyURL, method: "GET" }).then(function (response) {
  //     console.log(response);
  //     console.log(response.temp);
  //   });
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&appid=d99af31d18f58b92c977dbe59e43af60&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      //getting data
      console.log(data);
      var nameValue = data["name"];
      var tempValue = data["main"]["temp"];
      var descValue = data["weather"][0]["description"];
      var iconValue = data.weather.icon;
      var humidityValue = data["main"]["humidity"];
      var windSpeedValue = data.wind.speed;
      lat = data.coord.lat;
      long = data.coord.lon;
      console.log(humidityValue);
      console.log(hum.innerHTML);
      temp.innerHTML = tempValue;
      desc.innerHTML = descValue;
      icn.innerHTML = iconValue;
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
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
          inputValue.value +
          "&units=imperial&appid=d99af31d18f58b92c977dbe59e43af60"
      )
        .then((response) => response.json())
        .then((fiveDay) => {
          console.log(fiveDay);
          var fiveDayValue = fiveDay.list;

          console.log(fiveDayValue[5].main);
        });
    });

  //alerting wrong input
  // .catch((err) => alert("Wrong city name!"));
  //   fetch(
  //     "https://api.openweathermap.org/data/2.5/onecall?" +
  //       lat +
  //       long +
  //       "&appid=d99af31d18f58b92c977dbe59e43af60"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {});
});

//Loop through cityArray and create city buttons
for (var i = 0; i < cityArr.length; i++) {
  var $cityButton = $("<button>");
  $cityButton.text(cityArr[i]);
  $cityButton.attr("class", "btn city-button");
  $cityButton.attr("value", cityArr[i]);
  $cityButtonEl.append($cityButton).append("<br>");
}
