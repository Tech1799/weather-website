// const request = require('request');

// const geocode = (address, callback)=>{
//     const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYm9iLTEyMyIsImEiOiJjazFmM21jc2owcHN0M2RudGxuNjFsaWpqIn0.r3f5eKrCo3TPOhkCN9Uldg";

//     request({url: url, json: true},(error, {body})=>{
//         if(error){
//             callback('unable to connect to server!',undefined);
//         } else if(body.features.length == 0){
//             callback("Entered location doesn't exist, Try Again!", undefined);
//         } else{
//             callback(undefined, {
//                 latitude: body.features[0].center[1],
//                 longitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode;

const geocode = async (address, callback) => {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${process.env.MAPBOX_API_TOKEN}`,
  );
  const data = await response.json();
  if (!response.ok) {
    callback("unable to connect to the server", undefined);
  } else if (data.features.length == 0) {
    callback("Entered location doesn't exist!", undefined);
  } else {
    callback(undefined, {
      latitude: data.features[0].properties.coordinates.latitude,
      longitude: data.features[0].properties.coordinates.longitude,
      location: data.features[0].properties.full_address,
    });
  }
};

module.exports = geocode;
