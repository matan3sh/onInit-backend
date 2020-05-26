const enrollService = require('./enroll.service');

getEnroll = async (req, res) => {
  const enroll = await enrollService.getById(req.params.id);
  res.send(enroll);
};

getEnrolls = async (req, res) => {
  const enrolls = await enrollService.query(req.body);
  res.send(enrolls);
};

addEnroll = async (req, res) => {
  let enroll = req.body;
  enroll = await enrollService.add(enroll);
  res.send(enroll);
};

updateEnroll = async (req, res) => {
  const enroll = req.body;
  await enrollService.update(enroll);
  res.send(enroll);
};

deleteEnroll = async (req, res) => {
  await enrollService.remove(req.params.id);
  res.end();
};

module.exports = {
  getEnroll,
  getEnrolls,
  addEnroll,
  updateEnroll,
  deleteEnroll,
};
