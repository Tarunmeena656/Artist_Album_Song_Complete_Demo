const albumModel = require("../models/albumModel");
const artistModel = require("../models/artistModel");
const createError = require("http-errors");
const LikeModel = require("../models/LikeAlbumModel");
exports.createAlbum = async (req, res, next) => {
  try {
    const { albumName } = req.body;
    const { artistId } = req.params;
    if (artistId === req.user.id) {
      const album = await albumModel.create({ artistId, albumName });
      res.status(201).json({
        message: "Album Created Successfully",
        album,
      });
      
    } else {
      throw createError.Forbidden("Cannot create album for another artist");
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllAlbum = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const albums = await albumModel.find({ artistId }).lean();
    if (albums.length == 0)
      throw new createError.NotFound({
        status: 404,
        message: "Data not available",
      });
    res.json({
      albums: albums,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAlbumById = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const album = await albumModel.find({
      artistId: artistId,
      _id: albumId,
    });
    if (!album)
      throw new createError.NotFound({
        status: 404,
        message: "Album not  found",
      });
    res.json({
      message: "successfully fetching information",
      album,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAlbumById = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const album = await albumModel.findById(albumId);
    if (
      artistId === req.user.id &&
      album.artistId.equals(req.user.id) &&
      req.user.role == "artist"
    ) {
      const album = await albumModel.findByIdAndUpdate(
        albumId,
        { $set: req.body },
        { new: true }
      );
      if (!album)
        throw new createError.NotFound({
          status: 404,
          message: "Album not available",
        });
      res.json({
        message: "Successfully update",
        album: album,
      });
    } else {
      throw createError.Forbidden("You cannot update another artist's Album");
    }
  } catch (error) {
    next(error);
  }
};

exports.deletedAlbumById = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const { role } = req.user;
    const album = await albumModel.findById({ _id: albumId });
    if (
      (artistId === req.user.id &&
        album.artistId.equals(req.user.id) &&
        req.user.role == "artist" ||
      req.user.role == "admin")
    ) {
      const album = await albumModel.findByIdAndUpdate(
        albumId,
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
            deletedBy: req.user.role,
          },
        },
        { new: true }
      );
      if (!album)
        throw new createError.NotFound({
          status: 404,
          message: "Data not found",
        });
      res.status(201).json({
        message: "successfully deleted",
        album: album,
      });
    } else {
      throw createError.Forbidden("You cannot deleted another albums");
    }
  } catch (error) {
    next(error);
  }
};

exports.Album_Likes = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const Album = await LikeModel.findOne({
      LikeByArtist: artistId,
      LikeInAlbum: albumId,
    });
    if (Album) throw createError.Forbidden("You Already Like !");
    await LikeModel.create({ LikeByArtist: artistId, LikeInAlbum: albumId });
    await albumModel.findByIdAndUpdate(
      albumId,
      { $inc: { count_Likes: 1 } },
      { new: true }
    );
    res.json({
      message: "You Like a post",
      LikeByArtist: artistId,
      LikeInAlbum: albumId,
    });
  } catch (error) {
    next(error);
  }
};

exports.Album_dislike = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const artistLike = await LikeModel.findOne({
      LikeByArtist: artistId,
      LikeInAlbum: albumId,
    });

    if (!artistLike) throw createError.NotFound("No Any Like available");
    await albumModel.findByIdAndUpdate(
      albumId,
      { $inc: { count_Likes: -1 } },
      { new: true }
    );

    await LikeModel.deleteOne({ LikeByArtist: artistId, LikeInAlbum: albumId });
    res.json("Dislike");
  } catch (error) {
    next(error);
  }
};

exports.total_Like_Count = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const totalLikes = await albumModel.findById(albumId);
    res.json(
      `Total Likes in AlbumId  ${albumId} is : ${totalLikes.count_Likes}`
    );
  } catch (error) {
    next(error);
  }
};
