const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

query = async () => {
  const collection = await dbService.getCollection('user');
  try {
    const users = await collection.find().toArray();
    users.forEach((user) => delete user.password);
    return users;
  } catch (err) {
    console.log('ERROR: cannot find users');
    throw err;
  }
};

getById = async (id) => {
  const collection = await dbService.getCollection('user');
  try {
    const user = await collection.findOne({ _id: ObjectId(id) });
    return user;
  } catch (err) {
    console.log(`Error While fetching user with id of ${id}`);
    throw err;
  }
};

getByEmail = async (email) => {
  const collection = await dbService.getCollection('user');
  try {
    const user = await collection.findOne({ email });
    return user;
  } catch (err) {
    console.log(`ERROR: while finding user ${email}`);
    throw err;
  }
};

remove = async (id) => {
  const collection = await dbService.getCollection('user');
  try {
    await collection.deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    console.log(`ERROR: cannot remove user ${id}`);
    throw err;
  }
};

update = async (user) => {
  const collection = await dbService.getCollection('user');
  user._id = ObjectId(user._id);
  try {
    await collection.replaceOne({ _id: user._id }, { $set: user });
    return user;
  } catch (err) {
    console.log(`ERROR: cannot update user ${user._id}`);
    throw err;
  }
};

add = async (user) => {
  const collection = await dbService.getCollection('user');
  try {
    await collection.insertOne(user);
    return user;
  } catch (err) {
    console.log(`ERROR: cannot insert user`);
    throw err;
  }
};

module.exports = {
  query,
  getById,
  remove,
  add,
  update,
  getByEmail,
};
