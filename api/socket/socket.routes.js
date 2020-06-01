function connectSockets(io) {
  io.on('connection', (client) => {
    client.on('update-review', (course) => {
      io.emit('edit-review', course);
    });
    client.on('send-review', (course) => {
      io.emit('add-review', course);
    });
    client.on('confirm', (enroll) => {
      io.emit('confirm-enroll', enroll);
    });

    client.on('chat newMsg', (msg) => {
      io.emit('chat addMsg', msg);
      // emits only to sockets in the same room
      io.to(client.myTopic).emit('chat addMsg', msg);
    });
    client.on('chat topic', (topic) => {
      if (client.myTopic) {
        client.leave(client.myTopic);
      }
      client.join(topic);
      client.myTopic = topic;
    });
  });
}
module.exports = connectSockets;
