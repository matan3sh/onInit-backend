module.exports = connectSockets;

function connectSockets(io) {
  io.on('connection', (client) => {
    client.on('send-review', (course) => {
      io.emit('edit-review', course);
    });
  });
}
