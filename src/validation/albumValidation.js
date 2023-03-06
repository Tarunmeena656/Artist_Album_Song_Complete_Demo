const {Joi} = require('express-validation');
const { string } = require('joi');



exports.createAlbumValidation = {
    body:Joi.object({
        albumName: Joi.string().min(4).max(20).required() ,
   }),
   params:Joi.object({
    artistId:Joi.string().required()
})
}

exports.getAllAlbumValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),

    })
}
exports.getAllAlbumByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required()
        
    })
}

exports.updateAlbumByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required()
    }),
    body:Joi.object({
        albumName:Joi.string().min(4).max(20).required()
    })
}

exports.deleteAlbumByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required(),
        albumId:Joi.string().required()
    })
}

