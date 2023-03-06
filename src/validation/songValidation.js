const {Joi} = require('express-validation');
const { string } = require('joi');



exports.createSongValidation = {
    body:Joi.object({
        songName: Joi.string().min(4).max(20).required() ,
   }),
   params:Joi.object({
    artistId:Joi.string().required(),
    albumId:Joi.string().required()
})
}

exports.getAllSongValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required()

    })
}
exports.getAllSongByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required(),
        songId:Joi.string().required()
        
    })
}

exports.updateSongByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required(),
        songId:Joi.string().required()
    }),
    body:Joi.object({
        songName:Joi.string().min(4).max(20).required()
    })
}

exports.deleteSongByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required(),
        songId:Joi.string().required()
    })
}

