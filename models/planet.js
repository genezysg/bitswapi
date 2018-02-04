const mongoose=require('mongoose');

var planetSchema = new mongoose.Schema({
  name:  String,
  climate: String,
  terrain: String,
  updateAt: Date,
});

module.exports = mongoose.model('Planet',planetSchema)

