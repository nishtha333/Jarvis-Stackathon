import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Client connected to the server!');
});

export default socket;