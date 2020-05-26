const fs = require('fs');
const enrolls = require('../../data/enroll.json');

query = async () => {
  try {
    return Promise.resolve(enrolls);
  } catch (err) {
    console.log('Error cannot find enrolls');
    throw err;
  }
};

getById = async (id) => {
  try {
    const enroll = enrolls.find((enroll) => enroll._id === id);
    return Promise.resolve(enroll);
  } catch (err) {
    console.log(`Cannot find enroll with id of ${id}`);
    throw err;
  }
};

remove = async (id) => {
  try {
    const idx = enrolls.findIndex((enroll) => enroll._id == id);
    enrolls.splice(idx, 1);
    return _saveToFile().then(() => enrolls);
  } catch (err) {
    console.log(`Cannot remove enroll with id of ${id}`);
    throw err;
  }
};

update = async (enroll) => {
  try {
    const idx = enrolls.findIndex(
      (currEnroll) => enroll._id === currEnroll._id
    );
    enrolls[idx] = enroll;
    return _saveToFile().then(() => enroll);
  } catch (err) {
    console.log(`Error while updating enroll with id of ${enroll._id}`);
    throw err;
  }
};

add = async (enroll) => {
  try {
    enroll._id = _makeId();
    enroll.createdAt = Date.now();
    enrolls.unshift(enroll);
    return _saveToFile().then(() => enroll);
  } catch (err) {
    console.log('Error while adding enroll');
    throw err;
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
    const str = JSON.stringify(enrolls, null, 2);
    fs.writeFile('data/enroll.json', str, function (err) {
      if (err) {
        console.log('Server Error:', err);
        return reject(new Error('Cannot update enroll file'));
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
