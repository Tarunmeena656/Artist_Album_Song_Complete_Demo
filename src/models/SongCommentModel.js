const { Schema , model} = require('mongoose')


const SongSchema = new Schema(
    {
        CommentByArtist : {
            type : Schema.Types.ObjectId,
            ref : "artistModel"
        },

        CommentInSong:
        {
            type:Schema.Types.ObjectId,
            ref : "songModel"
        }

        
    },{versionKey:false}
)


module.exports = SongCommentModel = new model("songComment",SongSchema)