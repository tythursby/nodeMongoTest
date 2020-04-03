const {getDatabase} = require('./mongo');
const collectionName = 'data';
const {ObjectID} = require('mongodb');


async function insertData(data) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(data);
  return insertedId;
};

async function getData() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
};

async function deleteData(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
};

async function updateData(id, data) {
  const database = await getDatabase();
  delete data._id;
  await database.collection(collectionName).update(
    {_id: new ObjectID(id), },
    {
      $set: {
        ...data,
      },
    },
  );
};


module.exports ={
  insertData,
  getData,
  deleteData,
  updateData
};
