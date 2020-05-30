function connectSockets(io) {
  io.on('connection', (client) => {
    client.on('update-review', (course) => {
      io.emit('edit-review', course);
    });
    client.on('send-review', (course) => {
      io.emit('add-review', course);
    });
  });
  // io.on('connection', (socket) => {
  //   console.log('Connected');
  // socket.on('chat newMsg', (msg) => {
  //   console.log(msg);
  //   io.emit('chat addMsg', msg);

  //   // emits only to sockets in the same room
  //   io.to(socket.myTopic).emit('chat addMsg', msg);
  // });
  // socket.on('chat topic', (topic) => {
  //   if (socket.myTopic) {
  //     socket.leave(socket.myTopic);
  //   }
  //   socket.join(topic);
  //   socket.myTopic = topic;
  // });
  // });
}
module.exports = connectSockets;
