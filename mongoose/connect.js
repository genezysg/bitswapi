var mongoose = require('mongoose')
var config=require('config')


mongoose.connect(`mongodb://localhost/${config.db}`);


exports=mongoose
