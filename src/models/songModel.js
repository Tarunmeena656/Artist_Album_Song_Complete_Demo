const { Schema , model} = require('mongoose')


//Song Schema
const songSchema = new Schema({
songName:{
    type:String,
    required:true
},
artistId:{
    type:Schema.Types.ObjectId,
    ref:"artistModel"
},
albumId:{
    type : Schema.Types.ObjectId,
    ref:"albumModel"
},
count_comment:{
   type:Number
},
deletedAt:{
    type:Date
},
deletedBy:{
     type:String
},
isDeleted:{
    type:Boolean,
    default:false
}

},{timestamps:true,versionKey:false})

module.exports = songModel = new model("songdata",songSchema)