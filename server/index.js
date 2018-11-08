const app = require('./app');
const NewsAPI = require('newsapi');
const { NEWS_API_KEY } = require('./config');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require('socket.io')(server);

// handle sockets
require('./socket')(io);

const newsapi = new NewsAPI(NEWS_API_KEY);
setInterval(() => { 
      newsapi.v2.topHeadlines({ sources: 'bbc-news,the-verge', language: 'en'})
            .then(response => {
                  io.sockets.emit('update-news', { articles: response.articles, });
            })
            .catch(error => console.log(error));
      }, 15000);

