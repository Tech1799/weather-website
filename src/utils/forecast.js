// const request = require('request');

// forecast = (latitude, longitude, callback)=>{
//     const url = 'https://api.darksky.net/forecast/e24e1835b658997ac30b473d99f0c6ec/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'?units=si';
//     request({url, json: true}, (error, {body})=>{
//     if(error){
//         callback('unable to connect to weather service!', undefined);
//     } else if(body.error){
//         callback('location not found!',undefined);
//     } else{
//         callback(undefined,body.daily.data[0].summary +" It's currently " + body.currently.temperature + "\xB0C (degree celsius) out. The highest temperature today is " + body.daily.data[0].temperatureHigh + "\xB0C with lowest of "+ body.daily.data[0].temperatureLow + "\xB0C. There is " +  body.currently.precipProbability + "% chance of rain.")
//     }
// })
// }

const forecast = async (latitude, longitude, callback) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OP_WEATHER_TOKEN}`,
  );
  if (!response.ok) {
    callback("Unable to connect to the weather services!", undefined);
  }
  const data = await response.json();
  console.log(data);
  callback(
    undefined,
    `It's currently ${data.data[0].temp.day}\xB0C (degree Celsius) out. The highest temperature today is ${data.data[0].temp.max}\xB0C with the lowest of ${data.data[0].temp.min}\xB0C. Overall, ${data.data[0].weather[0].description}.`,
  );
};

module.exports = forecast;
