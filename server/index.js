const app = require('./app');
const { requestRefresh } = require('./socket/utils')

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require('socket.io')(server);

// handle sockets
require('./socket')(io);

requestRefresh(io);
setInterval(() => {
      requestRefresh(io);
}, process.env.TIME_INTERVAL_FOR_REFRESH_REQUEST);

if (process.env.SYNC_DB) {
      const conn = require('./db/conn');
      conn.sync({force: true});
}
