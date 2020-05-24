const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  deleteCourse,
  updateCourse,
} = require('./course.controller');
const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
