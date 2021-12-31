const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = process.env.PORT || 3000;
const users={};
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('user', (user) => {
    console.log(user);
   // users[socket.id] = user;
    io.emit('user', user);
  });

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    // if(users[socket.id]) {
    //   users[socket.id].isLoggedIn= false;
    //   io.emit('user', users[socket.id]);
    // }  
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));