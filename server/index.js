const MemoryData = require('./socket/data');
const app = require('./app');
const NewsAPI = require('newsapi');
const axios = require('axios');
const { NEWS_API_KEY, INTRINO_STOCK_API_KEY } = require('./config');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require('socket.io')(server);

// handle sockets
require('./socket')(io);

const TIME_INTERVAL_FOR_REFRESH_REQUEST = process.env.TIME_INTERVAL_FOR_REFRESH_REQUEST || 30000;


//Subscribe to Latest News
const newsapi = new NewsAPI(NEWS_API_KEY);
setInterval(() => { 
      newsapi.v2.everything({ sources: 'bloomberg,business-insider,cnbc,google-news,abc-news,bbc-news,bbc-sport,the-verge', language: 'en'})
            .then(response => {
                  MemoryData.news = { articles: response.articles };
                  io.sockets.emit('update-news', MemoryData.news);
            })
            .catch(error => console.log(error));
      }, TIME_INTERVAL_FOR_REFRESH_REQUEST);


//Subscribe to Stock Updates
//TO DO: Hard-code for now. Users should be able to add to it and only get updates for the ones they requested
const identifiers = ['SPY', 'GLD', 'XLF', 'NFLX', 'GOOG', 'AAPL', 'AMZN'].join(',')
const requestedPoints = 'price_date,last_price,close_price,percent_change,open_price,high_price,low_price'
setInterval(() => { 
      axios.get(`https://api.intrinio.com/data_point?identifier=${identifiers}&item=${requestedPoints}&api_key=${INTRINO_STOCK_API_KEY}`)
            .then(response => response.data)
            .then(stocks => {
                  MemoryData.stocks = stocks.data;
                  io.sockets.emit('update-stocks', MemoryData.stocks);
            })
            .catch(error => console.log(error));
      }, TIME_INTERVAL_FOR_REFRESH_REQUEST);




