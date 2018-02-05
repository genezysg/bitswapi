const mongoose=require("mongoose")

const MovieSchema = new mongoose.Schema({
	name:String
})

exports=mongoose.model('Movie',MovieSchema)