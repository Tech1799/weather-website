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
