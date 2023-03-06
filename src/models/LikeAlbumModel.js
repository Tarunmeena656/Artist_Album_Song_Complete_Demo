const { Schema ,model} = require('mongoose')


const likeSchema = new Schema(
    {
     LikeByArtist :{
        type:Schema.Types.ObjectId,
        ref :"artistModel"
     },
    LikeInAlbum : {
        type : Schema.Types.ObjectId,
        ref :"albumModel"
    }

},{versionKey:false}
)


module.exports = likeModel = new model("Likedata",likeSchema)