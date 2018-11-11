const MemoryData = require('./data');
const { requestStockUpdate } = require('./utils');

module.exports = io => {

  io.on('connection', socket => {
    console.log(socket.id, ' has made a connection to the server!');

    if(MemoryData.news) {
      socket.emit('update-news', MemoryData.news);
    }

    if(MemoryData.movies) {
      socket.emit('update-movies', MemoryData.movies);
    }

    if(MemoryData.tv) {
      socket.emit('update-tv', MemoryData.tv);
    }

    socket.on('subscribe-stocks', stocks => {
      if(stocks.length) {
        MemoryData.setStockListForSocket(socket.id, stocks);
        requestStockUpdate(io, stocks);
      } else if(MemoryData.getStockListForSocket(socket.id)) {
        io.to(socket.id).emit('update-stocks', {});
        MemoryData.removeSocket(socket.id);
      }
    });

    socket.on('disconnect', function() {
      console.log(`Client with Socket Id ${socket.id} disconnected`);
      MemoryData.removeSocket(socket.id);
    });

  });

};