const fs = require('fs');
const courses = require('../data/course.json');

function query() {
  return Promise.resolve(courses);
}

function getById(id) {
  const course = courses.find((course) => course._id == id);
  return Promise.resolve(course);
}

function remove(id) {
  const idx = courses.findIndex((course) => course._id == id);
  courses.splice(idx, 1);
  return _saveToFile().then(() => courses);
}

function save(course) {
  if (course._id) {
    const idx = courses.findIndex(
      (currCourse) => course._id === currCourse._id
    );
    courses[idx] = course;
  } else {
    course._id = _makeId();
    course.createdAt = Date.now();
    courses.unshift(course);
  }
  return _saveToFile().then(() => course);
}

module.exports = {
  query,
  getById,
  remove,
  save,
};

function _saveToFile() {
  return new Promise((resolve, reject) => {
    const str = JSON.stringify(courses, null, 2);
    fs.writeFile('data/course.json', str, function (err) {
      if (err) {
        console.log('Server Error:', err);
        return reject(new Error('Cannot update course file'));
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
