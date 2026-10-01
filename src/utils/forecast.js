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
