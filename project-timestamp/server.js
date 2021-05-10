// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, 
  utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});
app.get("/api", (req, res) => {
  res.json({ unix: new Date().getTime(), 
  utc: new Date()});
});

app.get("/api/:date_string", (req, res) => {
  let str = req.params.date_string;
  if (/\d{5,}/.test(str)) {
    const datei = parseInt(str);
    res.json({ unix: datei, 
    utc: new Date(datei).toUTCString() });
  } 

  else {
    let obj = new Date(str);
    if (obj.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: obj.valueOf(), 
      utc: obj.toUTCString() });
    }
  }
});