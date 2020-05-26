const express = require('express');
const {
  getEnrolls,
  getEnroll,
  addEnroll,
  updateEnroll,
  deleteEnroll,
} = require('./enroll.controller');
const router = express.Router();

router.get('/', getEnrolls);
router.get('/:id', getEnroll);
router.post('/', addEnroll);
router.put('/:id', updateEnroll);
router.delete('/:id', deleteEnroll);

module.exports = router;
