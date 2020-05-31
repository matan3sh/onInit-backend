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
  });
}
module.exports = connectSockets;
