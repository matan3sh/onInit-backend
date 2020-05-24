const fs = require('fs');
const users = require('../../data/user.json');

query = async () => {
  try {
    return Promise.resolve(users);
  } catch (err) {
    console.log('Error cannot find courses');
  }
};

getById = async (id) => {
  try {
    const user = users.find((user) => user._id == id);
    return Promise.resolve(user);
  } catch (err) {
    console.log(`Cannot find user with id of ${id}`);
  }
};

remove = async (id) => {
  try {
    const idx = users.findIndex((user) => user._id == id);
    users.splice(idx, 1);
    return _saveToFile().then(() => users);
  } catch (err) {
    console.log(`Cannot remove user with id of ${id}`);
  }
};

update = async (user) => {
  try {
    const idx = users.findIndex((currUser) => user._id === currUser._id);
    users[idx] = user;
    return _saveToFile().then(() => user);
  } catch (err) {
    console.log(`Error while updating user with id of ${user._id}`);
  }
};

add = async (user) => {
  try {
    user._id = _makeId();
    user.createdAt = Date.now();
    users.unshift(user);
    return _saveToFile().then(() => user);
  } catch (err) {
    console.log('Error while adding user');
  }
};

module.exports = {
  query,
  getById,
  remove,
  add,
  update,
};

function _saveToFile() {
  return new Promise((resolve, reject) => {
    const str = JSON.stringify(users, null, 2);
    fs.writeFile('data/user.json', str, function (err) {
      if (err) {
        console.log('Server Error:', err);
        return reject(new Error('Cannot update user file'));
      }
      resolve();
    });
  });
}

function _makeId(length = 10) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
