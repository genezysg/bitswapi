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



planetSchema.methods.updateAppearances=function () {
    var that=this
    var tid = logger.trace()

    return new Promise((resolve) => {
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

            return resolve(total)
        })
        .catch((zero) => {
            logger.info(tid,'Movie appearances has returned zero')

             return resolve(zero)
        })
    })
}

planetSchema.methods.updateMovies=function () {
    var that=this
    var tid = logger.trace()

    return new Promise((resolve) => {
        logger.info(tid,'getMovies from planet',that.name)
        swClient=new swapi.Client()
        swClient.moviesByPlanet(that.name).then((movies) => {
            try {
                assert.notDeepEqual(that.movies,movies,'Movies are Not Equal')
                that.movies=movies
                that.save()
                resolve(movies)
            } catch (err) {
                logger.info(tid,'Not saved',err)
                resolve([])
            }
        })
        .catch((error) => {
            logger.info(tid,'Movie  has returned empty',error)
            resolve([])
        })
    })
}






PlanetModel = mongoose.model('Planet',planetSchema)

PlanetModel.init().then((err) => {
    assert.ifError(err);
    logger.info('Indexed PlanetModel')
})
.catch(() => {
    logger.info('Already indexed, I hope')
    })


module.exports = PlanetModel
