const MemoryData = require('./data');

module.exports = io => {

  io.on('connection', socket => {
    console.log(socket.id, ' has made a connection to the server!');
    if(MemoryData.news) {
      socket.emit('update-news', MemoryData.news);
    }

    if(MemoryData.stocks) {
      socket.emit('update-stocks', MemoryData.stocks);
    }

    if(MemoryData.movies) {
      socket.emit('update-movies', MemoryData.movies);
    }

    if(MemoryData.tv) {
      socket.emit('update-tv', MemoryData.tv);
    }

    socket.on('disconnect', function() {
      console.log(`Client with Socket Id ${socket.id} disconnected`);
    });

  });

};