const fs = require('fs');
const courses = require('../../data/course.json');

query = async (criteria) => {
  try {
    let courseToReturn = courses;
    if (criteria.location)
      courseToReturn = courseToReturn.filter((course) =>
        course.location.includes(criteria.location)
      );
    if (criteria.category)
      courseToReturn = courseToReturn.filter((course) =>
        course.category.includes(criteria.category)
      );
    return Promise.resolve(courseToReturn);
  } catch (err) {
    console.log('Error cannot find courses');
  }
};

getById = async (id) => {
  try {
    const course = courses.find((course) => course._id == id);
    return Promise.resolve(course);
  } catch (err) {
    console.log(`Cannot find course with id of ${id}`);
  }
};

remove = async (id) => {
  try {
    const idx = courses.findIndex((course) => course._id == id);
    courses.splice(idx, 1);
    return _saveToFile().then(() => courses);
  } catch (err) {
    console.log(`Cannot remove course with id of ${id}`);
  }
};

update = async (course) => {
  try {
    const idx = courses.findIndex(
      (currCourse) => course._id === currCourse._id
    );
    courses[idx] = course;
    return _saveToFile().then(() => course);
  } catch (err) {
    console.log(`Error while updating course with id of ${course._id}`);
  }
};

add = async (course) => {
  try {
    course._id = _makeId();
    course.createdAt = Date.now();
    courses.unshift(course);
    return _saveToFile().then(() => course);
  } catch (err) {
    console.log('Error while adding course');
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
