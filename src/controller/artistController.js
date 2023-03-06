const artistModel = require("../models/artistModel");
const albumModel = require("../models/albumModel");
const songModel = require("../models/songModel");
const createError = require("http-errors");

exports.createArtist = async (req, res, next) => {
  try {
    const { artistName, email, password } = req.body;
    const artist = await artistModel.create({
      artistName,
      email,
      password
    });
    res.json({
      message: "Successfully created",
      artist,
    });
  
  } catch (error) {
    next(error);
  }
};

exports.getAllArtists = async (req, res, next) => {
  try {
    const artists = await artistModel.find().lean();
    res.json({
      artists: artists,
    });
  } catch (error) {
    next(error);
  }
};

exports.getArtistById = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const artist = await artistModel.findById(artistId);
    console.log(artistId)
    if (!artist)
      throw new createError.NotFound({
        status: 404,
        message: "Page Not found",
      });
    res.status(201).json({
      message: "Successfully ",
      artist
    });
  } catch (error) {
    next(error);
  }
};

exports.updatedArtistById = async (req, res, next) => {
  try {
    if (!artistName) throw new createError("Please Enter a artistName");
    const { artistId } = req.params;
    if (artistId === req.user.id) {
      const artist = await artistModel.findByIdAndUpdate(
         artistId ,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json({
        message: "Successfully updated",
        artist: artist,
      });
    } else {
      throw createError.Unauthorized();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteArtistById = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    if (artistId == req.user.id) {
      const artist = await artistModel.findByIdAndUpdate(
        artistId ,
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
            deletedBy: req.user.role,
          },
        },
        { new: true }
      );
      

      const album = await albumModel.findOne({artistId})
       await albumModel.updateMany(
          {artistId:album.artistId},
          {
            $set: {
              isDeleted: true,
              deletedAt: Date.now(),
              deletedBy: req.user.role,
            },
          },
          { new: true }
        )
        console.log(album)
        await songModel.updateMany(
          {artistId},
          {
            $set: {
              isDeleted: true,
              deletedAt: Date.now(),
              deletedBy: req.user.role,
            },
          },
          { new: true }
        );
      

      res.status(201).json({
        message: "Successfully deleted",
      

      });
    } else {
      throw createError.Unauthorized();
    }
  } catch (error) {
    next(error);
  }
  
};

exports.loginArtist = async (req, res, next) => {
  res.json({
    message: "Logging successfully",
    AccessToken: req.user.token,
  });
};
