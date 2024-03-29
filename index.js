const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const showdown = require('showdown');
const gloversController = require('./controllers/glovers-controller');
const fs = require('fs');

const INTERVIEW_ID_HEADER = 'interview-id';
const app = express();
const port = process.env.PORT || 8080;
const db = {};

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get('/', (req, res) => {
  const markdownConverter = new showdown.Converter();
  const readmeMarkdown = fs.readFileSync('./README.md', 'utf8');
  const readmeHtml = markdownConverter.makeHtml(readmeMarkdown);
  res.send(readmeHtml);
});

// Adds a "db" object to the request that is scoped by interview-id header
app.use((req, res, next) => {
  const interviewId = req.headers[INTERVIEW_ID_HEADER];
  if (!interviewId) {
    throw new Error(`Require header '${INTERVIEW_ID_HEADER}'`);
  }
  if (!db[interviewId]) {
    db[interviewId] = {
      glovers: {},
    };
  }
  req.db = db[interviewId];
  next();
});

// instantiate controllers with the db
app.use((req, res, next) => {
  req.controllers = {
    glovers: gloversController(req.db)
  };
  next();
})

app.get('/glovers', (req, res) => {
  res.json(req.controllers.glovers.list());
});
app.post('/glovers', (req, res) => {
  res.json(req.controllers.glovers.add(req.body));
});
app.delete('/glovers/:id', (req, res) => {
  res.json(req.controllers.glovers.delete(req.params.id));
});

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});

module.exports = app