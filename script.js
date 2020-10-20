var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

fetch('api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d99af31d18f58b92c977dbe59e43af60')