const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const gloversController = require('./controllers/GloversController.js')

app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get('/glovers', function (req, res) {
  res.json(gloversController.list())
})
app.post('/glovers', function (req, res) {
  res.json(gloversController.add(req.body))
})
app.delete('/glovers/:id', function (req, res) { // TODO: Parse gloverId
  res.json(gloversController.delete(req.params.id))
})

app.listen(process.env.PORT || 80, function () {
  console.log('CORS-enabled web server listening on port 80')
})