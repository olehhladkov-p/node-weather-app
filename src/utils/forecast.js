const axios = require('axios');

const forecast = ({ latitude, longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f801066fd79c6735afc61faddbee1e5f&query=${encodeURIComponent(
    latitude,
  )},${encodeURIComponent(longitude)}`;

  axios
    .get(url)
    .then(({ data }) => {
      if (data.error) {
        callback(data.error.info, undefined);

        return;
      }

      callback(undefined, {
        message: `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out. The humidity is ${data.current.humidity} %.`,
        location: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
      });
    })
    .catch(() => {
      callback('Unable to connect to weather service!', undefined);
    });
};

module.exports = forecast;
