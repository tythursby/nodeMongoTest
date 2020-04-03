const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertData, getData, deleteData, updateData} = require('./database/data');

const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/', async (req, res) => {
  res.send(await getData());
});

app.post('/', async (req, res) => {
  const newData = req.body;
  await insertData(newData);
  res.send({ message: 'New Data Inserted'});
});

app.delete('/:id', async (req, res) => {
  await deleteData(req.params.id);
  res.send({message: 'Data Deleted'});
});

app.put('/:id', async (req, res) => {
  const updated = req.body;
  await updateData(req.params.id, updated);
  res.send({message: 'Data Updated'});
});

startDatabase().then(async () => {
  await insertData({
    test: 'NEW TEST DATA'
  });
})

app.listen(3001, () => {
  console.log('listening on port 3001');
});
