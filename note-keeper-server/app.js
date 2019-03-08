var express = require('express');

var noteController = require('./controllers/noteController');
var firebase = require('firebase')
const mongoose = require("mongoose");

const app = express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST, PATCH, PUT, DELETE, OPTIONS");
    next();

});

mongoose.connect("mongodb+srv://kam:k1234@kamparsen-h3oh4.gcp.mongodb.net/note-keeper?retryWrites=true", { useNewUrlParser: true }).then
(() => {console.log('connected to databse "note-keeper".');})
.catch(()=>{console.log('connection to database faild');});

// mongoose.connect("mongodb://localhost:27017/notes").then
// (() => {console.log('connected to databse "note-keeper".');})
// .catch(()=>{console.log('connection to database faild');});

var port = process.env.PORT || 3000;

app.use('/assets',express.static(__dirname + '/public'));

noteController(app);

app.listen(port); //

