var mongoose = require('mongoose')
var config=require('config')
var logger = require('../logger')

mongoose.connect(config.mongooseURL).catch((error) => {
        logger.error('Mongoose não está connectado',error)
    });


exports=mongoose
