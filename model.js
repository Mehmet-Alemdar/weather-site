module.exports = {
  weather: weather,
}

function weather(jsonData) {
  let weatherObj = {}
  if (typeof jsonData.name === 'undefined') {
    weatherObj = {
      city: 'No city with this name found',
      icon: '',
      main: '',
      description: '',
      temp: '',
      feelsTemp: '',
      date: getDate(),
    }
  } else {
    weatherObj = {
      city: jsonData.name,
      icon: jsonData.weather[0].icon,
      main: jsonData.weather[0].main,
      description: jsonData.weather[0].description,
      temp: jsonData.main.temp,
      feelsTemp: jsonData.main.feels_like,
      date: getDate(),
    }
  }

  return weatherObj
}
function getDate() {
  const today = new Date()
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }

  return today.toLocaleDateString('en-EN', options)
}
