const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use("/dist", express.static(path.join(__dirname, "..", "dist")));

app.use('/api/weather', require('./api/weather'));
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.use((req, res, next) => {
    let error = new Error("Resource could not be found");
    error.status = 400;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || "Error occurred while processing the request");
});

module.exports = app;