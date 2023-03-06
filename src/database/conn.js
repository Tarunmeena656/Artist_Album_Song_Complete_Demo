const {set,connect,connection} = require('mongoose')



function connectDatabase(){
    set('strictQuery',true);
    return connect("mongodb://127.0.0.1/ArtistAlbumSongDemo");
}


connection.on("connected",()=>{
    console.log("connection successfully")
})


module.exports = connectDatabase