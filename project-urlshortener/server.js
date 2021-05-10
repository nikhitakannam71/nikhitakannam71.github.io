require('dotenv').config();
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var dns = require('dns');
var url = require('url');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://nkannam1:Nikki25first@cluster0.ouxc5.mongodb.net/URLShort?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const Short = new mongoose.Schema({url: String});
const URl_  = mongoose.model('URl_', Short);
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post("/api/shorturl", function(req, res) {
  console.log(req.body);
  let service = req.body.url;
  dns.lookup(url.parse(service).hostname, (err, addr) => {
  if(!addr) res.json({ 
    error: 'invalid url'
   });
  else{
    const next = new URl_({url : service});
    next.save((err, data) => {
      res.json({
        original_url : data.url, 
        short_url : data.id
      })
    })
  }
  })
});
app.get('/api/shorturl/:id', (req, res) =>{
  URl_.findById(req.params.id ,(err, data) =>{
    if(!data) { 
      error: 'invalid url' 
    }
    else 
    res.redirect(data.url)})
  });

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
