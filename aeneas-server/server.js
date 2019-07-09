const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(cors());

const SERVER_PORT = 3030;

app.use('/static', express.static('data'));

app.post('/upload', upload.single('audioBlob'), (req, res) => {
  const timestamp = req.file.originalname;
  const outputLocation = __dirname +
    '/data/' + timestamp + '.wav';

  fs.writeFileSync(
    outputLocation,
    Buffer.from(new Uint8Array(req.file.buffer))
  );

  return res.json({ id: timestamp });

});

app.listen(SERVER_PORT);
