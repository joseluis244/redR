var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

https.createServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert')
}, app)
.listen(3001, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})
