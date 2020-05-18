const axios = require('axios');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=pk.eyJ1Ijoib2xlaGhsYWRrb3YiLCJhIjoiY2thOGo1ZnNlMGRpbzJ5bzNmajZlbWU4ZiJ9.3YxGJVstA2Zg3uQeMjfwbw&limit=1`;

  axios
    .get(url)
    .then(({ data }) => {
      if (!data.features.length) {
        callback('Unable to find location! Try another search!', undefined);

        return;
      }

      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      });
    })
    .catch(() => {
      callback('Unable to connect to location service!', undefined);
    });
};

module.exports = geocode;
