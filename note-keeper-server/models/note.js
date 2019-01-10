const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    Balance: String,
    MP: String,
    Interest:String,
   // _id: String,


});


module.exports = mongoose.model('Note',noteSchema);;