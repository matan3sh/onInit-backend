const userService = require('./user.service');

getUsers = async (req, res) => {
  const users = await userService.query(req.body);
  res.send(users);
};

getUser = async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.send(user);
};

updateUser = async (req, res) => {
  const user = req.body;
  await userService.update(user);
  res.send(user);
};

addUser = async (req, res) => {
  let user = req.body;
  user = await userService.add(user);
  res.send(user);
};

deleteUser = async (req, res) => {
  await userService.remove(req.params.id);
  res.end();
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  addUser,
  deleteUser,
};
