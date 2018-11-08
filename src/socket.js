import io from 'socket.io-client';
import store, { updateNews } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Client connected to the server!');
});

export default socket;