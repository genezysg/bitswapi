const mongoose=require('mongoose');
const swapi=require('../clients/swapi')

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

    swapi.getAppearances(that.name,(err,appearances) => {
        if (err) {
            return;
        }
        if (that.movieAppearances !== appearances) {
            that.movieAppearances=appearances
            that.save()
        }
    })
}

module.exports = mongoose.model('Planet',planetSchema)
