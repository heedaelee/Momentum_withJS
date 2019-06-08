const temp = document.querySelector(".js-temp");
const loc = document.querySelector(".js-loc");
const icon = document.querySelector(".js-icon");

const API_KEY = "8a0ff416c5488552f68da7eaf7ddb02d";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(response => response.json())
    .then(json => {
      console.log(json);

      const temperature = json.main.temp;
      const place = json.name;
      const iconNum = json.weather[0].icon;

      temp.innerText = `${temperature}℃`;
      loc.innerText = `${place}`;
      icon.src = `http://openweathermap.org/img/w/${iconNum}.png`;
    }); //.then 패치가 완료되기까지 기다림
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  //로컬 스토리지에 저장
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  //location 값 얻는 key
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords); //json형태로 parsing해서 던짐
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
