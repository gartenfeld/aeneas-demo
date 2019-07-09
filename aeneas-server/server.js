const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const app = express();

const shell = require('shelljs');

app.use(cors());

const SERVER_PORT = 3030;

app.use('/static', express.static('data'));

app.post('/upload', upload.single('audioBlob'), (req, res) => {
  const timestamp = req.file.originalname;
  const basePath = `${__dirname}/data`
  const audioFilePath = `${basePath}/${timestamp}.wav`;

  fs.writeFileSync(
    audioFilePath,
    Buffer.from(new Uint8Array(req.file.buffer))
  );

  const transcriptPath = `${basePath}/original/transcript.txt`;
  const mp3Path = `${basePath}/${timestamp}.mp3`
  const jsonPath = `${basePath}/${timestamp}.json`

  const cmdOpusToMp3 = `ffmpeg -loglevel panic -i ${audioFilePath} -ss 0.040 -af silenceremove=1:0:-48dB -vn -ar 44100 -ac 2 -b:a 128k ${mp3Path}`
  shell.exec(cmdOpusToMp3);

  const cmdAeneas = `python -m aeneas.tools.execute_task ${mp3Path} ${transcriptPath} 'task_language=deu|is_text_type=plain|os_task_file_format=json|task_adjust_boundary_nonspeech_min=0.100|task_adjust_boundary_nonspeech_string=REMOVE' ${jsonPath}`
  shell.exec(cmdAeneas);

  const results = JSON.parse(fs.readFileSync(jsonPath));
  results.id = timestamp;

  const fragments = results.fragments;
  fragments.forEach((fragment, idx) => {
    const fileSuffix = idx + 1;
    const startTime = fragment.begin;
    const endTime = fragment.end;
    const cmdExtractSection = `ffmpeg -loglevel panic -i ${mp3Path} -ss ${startTime} -to ${endTime} -acodec copy ${basePath}/${timestamp}_${fileSuffix}.mp3 `;
    shell.exec(cmdExtractSection);
  })

  console.log(`Processed in ${Date.now()-Number(timestamp)} ms`)
  return res.json(results);
});

app.listen(SERVER_PORT);
