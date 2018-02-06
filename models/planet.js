const mongoose=require('mongoose');

var planetSchema = new mongoose.Schema({
  climate: String,
  movieAppearances: Number,
  name:  String,
  terrain: String,
  updateAt: Date
});



module.exports = mongoose.model('Planet',planetSchema)
