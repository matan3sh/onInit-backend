const ObjectId = require('mongodb').ObjectId;
const dbService = require('../../services/db.service');

query = async () => {
  const collection = await dbService.getCollection('course');
  try {
    const courses = await collection.find().toArray();
    console.log(courses);
    return courses;
  } catch (err) {
    console.log('Error cannot find courses');
    throw err;
  }
};

getById = async (id) => {
  const collection = await dbService.getCollection('course');
  try {
    const course = await collection.findOne({ _id: ObjectId(id) });
    return course;
  } catch (err) {
    console.log(`Error While fetching course with id of ${id}`);
    throw err;
  }
};

remove = async (id) => {
  const collection = await dbService.getCollection('course');
  try {
    await collection.deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    console.log(`Error While deleteing course with id of ${id}`);
    throw err;
  }
};

update = async (course) => {
  const collection = await dbService.getCollection('course');
  course._id = ObjectId(course._id);
  try {
    await collection.replaceOne({ _id: course._id }, { $set: course });
    return course;
  } catch (err) {
    console.log(`Error While updating course with id of ${id}`);
    throw err;
  }
};

add = async (course) => {
  const collection = await dbService.getCollection('course');
  try {
    await collection.insertOne(course);
    return course;
  } catch (err) {
    console.log(`Error While adding toy`);
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
