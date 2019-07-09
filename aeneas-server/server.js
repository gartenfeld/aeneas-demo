const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const SERVER_PORT = 3030;

app.use('/static', express.static('data'));

app.get('/hello', (req, res) => {
  return res.json({ message: 'Hello!' });
});

app.listen(SERVER_PORT);
