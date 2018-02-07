const mongoose=require('mongoose');
const swapi=require('../clients/swapi')
const logger=require('../logger')

var planetSchema = new mongoose.Schema({
  climate: String,
  name:  String,
  terrain: String,
  updateAt: Date,
  movieAppearances: {
                     type:Number,
                     default:0
                    }
});



planetSchema.methods.getAppearances=function () {
    var that=this
    var tid = logger.trace()

    logger.info(tid,'change movieAppearance of planet',that.name)

    swapi.getAppearances(that.name,(err,appearances) => {
        if (err) {
            logger.error(tid,'Cant get appearances of a planet',err,that.name)

            return;
        }
        if (that.movieAppearances !== appearances) {
            logger.info(tid,'Movie appearances found and changed','before',that.movieAppearances,'new',appearances)
            that.movieAppearances=appearances
            that.save()
        }
        logger.info(tid,'Not saved')
    })
}

module.exports = mongoose.model('Planet',planetSchema)
