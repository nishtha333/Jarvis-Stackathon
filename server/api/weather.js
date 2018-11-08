const axios = require('axios');
const express = require('express');
const { WEATHER_KEY } = require('../config');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.latitude.trim()}&lon=${req.query.longitude.trim()}&APPID=${WEATHER_KEY}&units=imperial`;
    axios.get(url)
        .then(response => response.data)
        .then(details => res.send(details))
        .catch(next)
});