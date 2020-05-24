const courseService = require('./course.service');

getCourse = async (req, res) => {
  const course = await courseService.getById(req.params.id);
  res.send(course);
};

getCourses = async (req, res) => {
  const courses = await courseService.query(req.body);
  res.send(courses);
};

addCourse = async (req, res) => {
  let course = req.body;
  course = await courseService.add(course);
  res.send(course);
};

updateCourse = async (req, res) => {
  const course = req.body;
  await courseService.update(course);
  res.send(course);
};

deleteCourse = async (req, res) => {
  await courseService.remove(req.params.id);
  res.end();
};

module.exports = {
  getCourse,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
