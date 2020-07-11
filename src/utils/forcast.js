const fetch = require('node-fetch')

const forcast = (lat, long, callback) => {
  const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&&appid=90475aae2f5f3e33cb5460fc9b3f6c85&units=metric'
  
  fetch(url)
   .then(res => res.json())
   .then(res => {
     if (res.cod === '400') {
       callback(undefined,'Invalid latitude or longitude.' + res.message)
     } else {
       callback('It is currently '+ res.current.temp + ' degrees.' + 'Today\'s maximum temprature: '+ res.daily[0].temp.max + ' degrees.' + 'Today\'s minimum temprature: '+ res.daily[0].temp.min + ' degrees.' + 'Chance of rain: ' + res.daily[0].weather[0].description,undefined)
     }
   } )
   .catch(e => callback(undefined, 'unable to connect to the network.'))
}

module.exports = forcast