const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');

// Get all courses
router.get('/', (req, res) => {
  courseService.query().then((courses) => res.json(courses));
});

// Get single course
router.get('/:id', (req, res) => {
  courseService.getById(req.params.id).then((course) => res.json(course));
});

// Delete course
router.delete('/:id', (req, res) => {
  courseService.remove(req.params.id).then((courses) => res.json(courses));
});

// Create new course
router.post('/', (req, res) => {
  courseService.save(req.body).then((course) => res.json(course));
});

// Update course
router.put('/:id', (req, res) => {
  courseService.save(req.body).then((course) => res.json(course));
});

module.exports = router;
