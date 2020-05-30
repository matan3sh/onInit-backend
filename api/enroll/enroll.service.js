const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

query = async () => {
  const collection = await dbService.getCollection('enroll');
  try {
    const enrolls = await collection.find().toArray();
    return enrolls;
  } catch (err) {
    console.log('Error cannot find toys');
    throw err;
  }
};

getById = async (id) => {
  const collection = await dbService.getCollection('enroll');
  try {
    const enroll = await collection.findOne({ _id: ObjectId(id) });
    return enroll;
  } catch (err) {
    console.log(`Error While fetching enroll with id of ${id}`);
    throw err;
  }
};

remove = async (id) => {
  const collection = await dbService.getCollection('enroll');
  try {
    await collection.deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    console.log(`Error While deleteing enroll with id of ${id}`);
    throw err;
  }
};

update = async (enroll) => {
  const collection = await dbService.getCollection('enroll');
  enroll._id = ObjectId(enroll._id);
  try {
    await collection.replaceOne({ _id: toy._id }, { $set: toy });
    return enroll;
  } catch (err) {
    console.log(`Error While updating enroll with id of ${id}`);
    throw err;
  }
};

add = async (enroll) => {
  const collection = await dbService.getCollection('enroll');
  try {
    await collection.insertOne(enroll);
    return enroll;
  } catch (err) {
    console.log(`Error While adding enroll`);
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
