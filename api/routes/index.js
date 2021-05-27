const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const kue = require('kue');
const kueUiExpress = require('kue-ui-express');


const app = express();
app.use(cors());
app.use(cors());
kue.createQueue();

kueUiExpress(app, '/kue/', '/kue-api');
app.use('/kue-api', kue.app);

app.use(bodyParser.json({ limit: '16mb' }));
app.use(bodyParser.urlencoded({ limit: '16mb', extended: false }));




app.get('/', (req, res) => {
  res.send('Welcome to Admission Home Page');
});

module.exports = app;
