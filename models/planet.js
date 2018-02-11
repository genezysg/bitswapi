const mongoose=require('mongoose');
const swapi=require('../clients/swapi')
const logger=require('../logger')
const assert=require('assert')

var planetSchema = new mongoose.Schema({
  climate: String,
  name:  {
            type:String,
            unique:true
         },
  terrain: String,
  updateAt: Date,
  movieAppearances: {
                     type:Number,
                     default:0
                 },
  movies:[String]
});



planetSchema.methods.getAppearances=function () {
    var that=this
    var tid = logger.trace()

    logger.info(tid,'change movieAppearance of planet',that.name)
    swClient=new swapi.Client()
    swClient.totalAppearances(that.name).then((total) => {
        if (that.movieAppearances === total) {
            logger.info(tid,'Not saved')
        } else {
            logger.info(tid,'Movie appearances found and changed','before',that.movieAppearances,'new',total)
            that.movieAppearances=total
            that.save()
        }
    })
    .catch(() => {
        logger.info(tid,'Movie appearances has returned zero')
    })
}


PlanetModel = mongoose.model('Planet',planetSchema)

PlanetModel.init().then((err) => {
    assert.ifError(err);
    logger.info('Indexed PlanetModel')
})


module.exports = PlanetModel
