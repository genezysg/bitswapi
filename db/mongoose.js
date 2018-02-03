var mongoose = require('mongoose')
var config = require('config')
mongoose.connect(`mongodb://localhost/${config.db}`);

var planetSchema = new mongoose.Schema({
  name:  String,
  climate: String,
  terrain: String,
  updateAt: Date,
});

module.exports = {
    model:{
        Planet:mongoose.model('planets', planetSchema)
    }
}
