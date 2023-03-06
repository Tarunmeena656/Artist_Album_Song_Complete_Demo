const { Schema , model}= require('mongoose')


// Album schema
const albumSchema = new Schema({
    albumName : {
        type:String,
        required:true
    },
    artistId:{
        type:Schema.Types.ObjectId,
        ref:'artistModel'
    },
    count_Likes:{
        type:Number
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedBy:{
        type:String
    }
    ,deletedAt:{
        type:Date
    }
},{timestamps:true,versionKey:false})



module.exports = albumModel = new model("albumdata",albumSchema)