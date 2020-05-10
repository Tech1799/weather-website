const request = require('request');

forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/[use your token]/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'?units=si';
    request({url, json: true}, (error, {body})=>{
    if(error){
        callback('unable to connect to weather service!', undefined);
    } else if(body.error){
        callback('location not found!',undefined);
    } else{
        callback(undefined,body.daily.data[0].summary +" It's currently " + body.currently.temperature + "\xB0C (degree celsius) out. The highest temperature today is " + body.daily.data[0].temperatureHigh + "\xB0C with lowest of "+ body.daily.data[0].temperatureLow + "\xB0C. There is " +  body.currently.precipProbability + "% chance of rain.")
    }
})
}

module.exports = forecast;
