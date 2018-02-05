const mongoose=require('mongoose')
const Movie = require('./movie')

var planetSchema = new mongoose.Schema({
  name:  String,
  climate: String,
  terrain: String,
  updateAt: Date,
  movies:[{type:mongoose.Schema.Types.ObjectId,ref:"Movie"}]
});


module.exports = mongoose.model('Planet',planetSchema)

