const MemoryData = require('./data');
const NewsAPI = require('newsapi');
const axios = require('axios');
const { NEWS_API_KEY, INTRINO_STOCK_API_KEY, TMBD_API_KEY } = require('../config');

const requestNewsUpdate = (io) => {
    const newsapi = new NewsAPI(NEWS_API_KEY);
    newsapi.v2.everything({ sources: 'bloomberg,business-insider,cnbc,google-news,abc-news,bbc-news,bbc-sport,the-verge', language: 'en'})
          .then(response => {
                MemoryData.news = { articles: response.articles };
                io.sockets.emit('update-news', MemoryData.news);
          })
          .catch(error => console.log(error));
}

const requestStockUpdate = (io, list) => {

    const identifiers = !list ? Object.keys(MemoryData.stocks).join(',') : list
    const requestedPoints = 'price_date,last_price,close_price,percent_change,open_price,high_price,low_price'

    if(!identifiers.length) return;
    
    console.log(`Request made for ${identifiers}`)
    axios.get(`https://api.intrinio.com/data_point?identifier=${identifiers}&item=${requestedPoints}&api_key=${INTRINO_STOCK_API_KEY}`)
          .then(response => response.data)
          .then(stocks => {
                MemoryData.stocks = stocks.data;
                MemoryData.getAllSocketsIds().forEach(id => {
                    io.to(id).emit('update-stocks', MemoryData.getStockListForSocket(id, MemoryData.stocks));
                });
          }).catch(error => console.log(error));
}

const TOP_POPULAR_ITEMS_NUMBER = 10;
const sortByPopularity = (obj1, obj2) =>  (obj2.popularity - obj1.popularity);

const requestMovies = (io) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMBD_API_KEY}`)
          .then(response => response.data)
          .then(movies => {
                MemoryData.movies = movies.results.sort(sortByPopularity).slice(TOP_POPULAR_ITEMS_NUMBER);
                io.sockets.emit('update-movies', MemoryData.movies);
          })
          .catch(error => console.log(error));
}

const requestTVShows = (io) => {
    axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${TMBD_API_KEY}`)
          .then(response => response.data)
          .then(tv => {
                MemoryData.tv = tv.results.sort(sortByPopularity).slice(TOP_POPULAR_ITEMS_NUMBER);
                io.sockets.emit('update-tv', MemoryData.tv);
          })
          .catch(error => console.log(error));
}

const requestRefresh = (io) => {
    console.log("Refreshing...");
    requestNewsUpdate(io);
    requestStockUpdate(io);
    requestMovies(io);
    requestTVShows(io);
}

module.exports = { requestRefresh, requestStockUpdate }