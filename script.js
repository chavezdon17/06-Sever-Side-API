var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

button.addEventListener('click',function(){
fetch('api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d99af31d18f58b92c977dbe59e43af60')
.then(response => response.json())
.then(data => {
    //getting data
    var nameValue = data ['name'];
    var temp = data['main']['temp'];
    var descValue = data['weather'][0]['description'];

    name.innerHTML = nameValue;
    temp.innerHTML = tempValue;
    desc.innerHTML = descValue;

})

//alerting wrong input 
.catch(err = alert('Wrong city name!'))
})