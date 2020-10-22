var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

var $cityButtonEl = $("#city-button-element");

var cityArr = [];

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
      var nameValue = data["name"];
      var tempValue = data["main"]["temp"];
      var descValue = data["weather"][0]["description"];

      lat = data.coord.lat;
      long = data.coord.lon;

      temp.innerHTML = tempValue;
      desc.innerHTML = descValue;
    })

    //alerting wrong input
    .catch((err) => alert("Wrong city name!"));
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?" +
      "lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=d99af31d18f58b92c977dbe59e43af60"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

//Loop through cityArray and create city buttons
for (var i = 0; i < cityArr.length; i++) {
  var $cityButton = $("<button>");
  $cityButton.text(cityArr[i]);
  $cityButton.attr("class", "btn city-button");
  $cityButton.attr("value", cityArr[i]);
  $cityButtonEl.append($cityButton).append("<br>");
}
