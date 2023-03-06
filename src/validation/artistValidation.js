const {Joi} = require('express-validation');




exports.createArtistValidation = {
    body:Joi.object({
        artistName:Joi.string().min(4).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(8),
        role:Joi.string()
   })
}


exports.loginValidation = {
    body : Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(8).required()
    })
}

exports.getArtistByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required()
    })
}

exports.updateArtistByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required()
    }),
    body:Joi.object({
        artistName:Joi.string().min(4).max(20).required()
    })
}

exports.deleteArtistByIdValidation = {
    params:Joi.object({
        artistId:Joi.string().required()
    })
}

