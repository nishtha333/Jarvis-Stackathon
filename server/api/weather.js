const axios = require('axios');
const express = require('express');
const { WEATHER_KEY } = require('../config');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.latitude.trim()}&lon=${req.query.longitude.trim()}&APPID=${WEATHER_KEY}&units=imperial`;
    axios.get(url)
        .then(response => response.data)
        .then(details => {
            const weather = { city: details.name, country: details.sys.country, 
                summary: details.weather[0].main, description: details.weather[0].description, 
                temp: details.main.temp, humidity: details.main.humidity, 
                temp_min: details.main.temp_min, temp_max: details.main.temp_max,
                iconURL: `http://openweathermap.org/img/w/${details.weather[0].icon}.png`
            }
            res.send(weather)
        })
        .catch(next)
});
