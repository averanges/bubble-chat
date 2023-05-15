import io from 'socket.io-client'

let socket;
let socketid;

if (!localStorage.getItem('socketId')) {
  socket = io('https://bubblechat-server.onrender.com', {autoConnect: false});
  socket.on('connect', () => {
    socketid = socket.id
    if (socketid) {
      localStorage.setItem('socketId', socketid);
    }
  });
} else {
  const socketId = localStorage.getItem('socketId');
  socket = io('https://bubblechat-server.onrender.com', {
    query: { socketId }
  });
}

export default socket;
