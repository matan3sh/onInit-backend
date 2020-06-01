const ObjectId = require('mongodb').ObjectId;
const dbService = require('../../services/db.service');

query = async (filterBy) => {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection('course');
  try {
    const courses = await collection.find(criteria).toArray();
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

function _buildCriteria(filterBy) {
  const criteria = {};
  if (filterBy.name) {
    criteria.name = { $regex: `(?i).*${filterBy.name}.*` };
  }
  if (filterBy.location) {
    criteria['location.address'] = { $regex: `(?i).*${filterBy.location}.*` };
  }
  if (filterBy.category) {
    criteria.category = { $regex: filterBy.category };
  }
  return criteria;
}
