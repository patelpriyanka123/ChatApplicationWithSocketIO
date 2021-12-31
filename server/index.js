// import { userList } from './src/userList';
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});
//const userList=  require('userList')()

const port = process.env.PORT || 3000;
const users={};
io.on('connection', (socket) => {
  console.log('a user connected'); 
  socket.on('user', (user) => {   
    // users[socket.id] = user;
    // console.log(users[socket.id]);
    io.emit('user', user);
  });

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnected!')
    // users[socket.id].isLoggedIn= false;
    // io.emit('user', users[socket.id]);
    console.log('a user disconnected!');
    
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));