var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  characterId: { type: String, unique: true, index: true },
   img: { data: Buffer, contentType: String }, 
  name: String,
  password: String,
  gender: String
});

module.exports = mongoose.model('Character', characterSchema);
