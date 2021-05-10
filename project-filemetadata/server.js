var express = require('express');
var cors = require('cors');
let mul = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", mul().single("upfile"), 
function(req, res){
  let enter = {}
  enter['name'] = req.file.originalname;
  enter['type'] = req.file.mimetype;
  enter['size'] = req.file.size;
  res.json(enter);
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
