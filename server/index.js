const MemoryData = require('./socket/data');
const app = require('./app');
const NewsAPI = require('newsapi');
const axios = require('axios');
const { NEWS_API_KEY, INTRINO_STOCK_API_KEY, TMBD_API_KEY } = require('./config');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require('socket.io')(server);

// handle sockets
require('./socket')(io);

const requestNewsUpdate = () => {
      const newsapi = new NewsAPI(NEWS_API_KEY);
      newsapi.v2.everything({ sources: 'bloomberg,business-insider,cnbc,google-news,abc-news,bbc-news,bbc-sport,the-verge', language: 'en'})
            .then(response => {
                  MemoryData.news = { articles: response.articles };
                  io.sockets.emit('update-news', MemoryData.news);
            })
            .catch(error => console.log(error));
}

const requestStockUpdate = () => {
      //TO DO: Hard-code for now. Users should be able to add to it and only get updates for the ones they requested
      const identifiers = ['SPY', 'GLD', 'XLF', 'NFLX', 'GOOG', 'AAPL', 'AMZN'].join(',')
      const requestedPoints = 'price_date,last_price,close_price,percent_change,open_price,high_price,low_price'

      axios.get(`https://api.intrinio.com/data_point?identifier=${identifiers}&item=${requestedPoints}&api_key=${INTRINO_STOCK_API_KEY}`)
            .then(response => response.data)
            .then(stocks => {
                  MemoryData.stocks = stocks.data;
                  io.sockets.emit('update-stocks', MemoryData.stocks);
            })
            .catch(error => console.log(error));
}

const TOP_POPULAR_ITEMS_NUMBER = 10;
const sortByPopularity = (obj1, obj2) =>  (obj2.popularity - obj1.popularity);

const requestMovies = () => {
      axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMBD_API_KEY}`)
            .then(response => response.data)
            .then(movies => {
                  MemoryData.movies = movies.results.sort(sortByPopularity).slice(TOP_POPULAR_ITEMS_NUMBER);
                  io.sockets.emit('update-movies', MemoryData.movies);
            })
            .catch(error => console.log(error));
}

const requestTVShows = () => {
      axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${TMBD_API_KEY}`)
            .then(response => response.data)
            .then(tv => {
                  MemoryData.tv = tv.results.sort(sortByPopularity).slice(TOP_POPULAR_ITEMS_NUMBER);
                  io.sockets.emit('update-tv', MemoryData.tv);
            })
            .catch(error => console.log(error));
}

const requestRefresh = () => {
      console.log("Refreshing...");
      requestNewsUpdate();
      requestStockUpdate();
      requestMovies();
      requestTVShows();
}

requestRefresh();

setInterval(() => {
      requestRefresh();
}, process.env.TIME_INTERVAL_FOR_REFRESH_REQUEST);

if (process.env.SYNC_DB) {
      const conn = require('./db/conn');
      conn.sync({force: true});
}
