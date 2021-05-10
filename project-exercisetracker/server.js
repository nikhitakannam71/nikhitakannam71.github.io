const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const shortId = require("shortid")


let sub = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://nsomeone:someoneDB123@cluster0.ouxc5.mongodb.net/Tracker?retryWrites=true&w=majority', sub);

const NewUserSch = mongoose.Schema({
  description:{type: String, required: true},
  duration: {type: Number, required: true},
  date: String
});
const NewSchema = mongoose.Schema({
  username:{type: String, required: true},
  log: [NewUserSch]
});
let Exe = new  mongoose.model('Exe', NewSchema);
let Tra = new mongoose.model('Tra', NewUserSch);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/')
});

app.post("/api/users", function (req,res){
  let newUser = new Exe({username: req.body.username});
  newUser.save();
  return res.json({'username': newUser.username, '_id': newUser.id}) 
})
app.get("/api/users", function (req, res){
  Exe.find({}, function(err, data){ 
    res.json(data);
  })
})


app.post("/api/users/:_id/exercises", function(req, res){
  let dur = req.body.duration;
  let da = req.body.date;
  var newTracker = new Tra({description: req.body.description, 
  duration: dur,
  date: da
  })
  if(!newTracker.date){newTracker.date = new Date().toISOString().substring(0,10);}
  newTracker.save();
  let y = Exe.findByIdAndUpdate(req.params._id,
      {$push: {log: newTracker}},
      {new: true},function(err, data){
        let first = {}
        first["username"] = data.username
        first["description"] = req.body.description
        first["duration"] = newTracker.duration
        first["_id"] = data._id
        first["date"] = new Date(newTracker.date).toDateString(); 
        res.json(first);
      })
})



app.get("/api/users/:_id/logs", function(req,res){
  
  let y = Exe.findById(req.params._id, function(err, data){
      let next = {}
      next["_id"] = data._id
      next["username"] = data.username
      end = req.query.to ? new Date(req.query.to) : new Date();
      start = req.query.from ? new Date(req.query.from) : new Date(0);
      data.log = data.log.filter((item) =>{
        let next = new Date(item.date).getTime();
        return next >= start && next <= end;
      })
      next["log"] = data.log.slice(0, req.query.limit);
      next["count"] = data.log.length;
      
      res.json(next);
      
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})