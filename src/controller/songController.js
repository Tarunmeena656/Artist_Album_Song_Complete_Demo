const songModel = require("../models/songModel");
const createError = require("http-errors");
const albumModel = require("../models/albumModel");
const SongCommentModel = require("../models/SongCommentModel");

exports.createSong = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const { songName } = req.body;
    if (artistId === req.user.id) {
      const song = await songModel.create({ artistId, albumId, songName });
      res.json({
        message: "Successfully created",
        song: song,
      });
    } else {
      throw createError.Forbidden(
        "Cannot be created Song! Please Login Yourself",
        403
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllSong = async (req, res, next) => {
  try {
    const { artistId, albumId } = req.params;
    const songs = await songModel
      .find({ artistId: artistId, albumId: albumId })
      .lean();
    if (songs.length == 0)
      throw new createError.NotFound({
        status: 404,
        message: "Data Not found",
      });
    res.json({
      message: "Successfully fetching",
      songs: songs,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSongById = async (req, res, next) => {
  try {
    const { songId, artistId, albumId } = req.params;
    const song = await songModel.find({
      _id: songId,
      artistId: artistId,
      albumId: albumId,
    });
    if (song.length == 0)
      throw new createError.NotFound({
        status: 404,
        message: "Song Data not available",
      });
    res.json({
      message: "Successfully fetched",
      song: song,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSongById = async (req, res, next) => {
  try {
    const { artistId, albumId, songId } = req.params;
    const { songName } = req.body;
    const songData = await songModel.findById({ _id: songId });
    if (!songData) return createError.NotFound("Song Id not available");
    if (
      artistId == req.user.id &&
      songData.artistId == req.user.id &&
      albumId == songData.albumId &&
      req.user.role == "artist"
    ) {
      const song = await songModel.findByIdAndUpdate(
         songId ,
        { $set: req.body },
        { new: true }
      );
      res.json({
        message: "Successfully Update",
        song: song,
      });
    } else {
      throw createError.Forbidden("Cannot update another Album's song");
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteSongById = async (req, res, next) => {
  try {
    const { artistId, albumId, songId } = req.params;
    const songData = await songModel.findById(songId);
    if (
      artistId == req.user.id &&
      songData.artistId == req.user.id &&
      albumId == songData.albumId &&
      req.user.role =="artist" ||
      req.user.role == "admin"
    ) {
      const song = await songModel.findByIdAndUpdate(
         songId,
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
            deletedBy: req.user.role,
          },
        },
        { new: true }
      );
      res.json({
        message: "Deleted successfully",
        song: song,
      });
    } else {
      throw createError.Forbidden("Cannot Delete another Album's Song");
    }
  } catch (error) {
    next(error);
  }
};

exports.Comment = async (req, res, next) => {
  try {
    const { artistId, songId } = req.params;
    const SongComment = await SongCommentModel.create({
      CommentByArtist: artistId,
      CommentInSong: songId,
    });
    await songModel.findByIdAndUpdate(
       songId,
      { $inc: { count_comment: 1 } },
      { new: true }
    );
    res.json(SongComment)
     
  } catch (error) {
    next(error);
  }
};

exports.DeleteComment = async (req, res, next) => {
  try {
    const { artistId, songId } = req.params;
    await SongCommentModel.findOne(
      {
        CommentByArtist:artistId,
        CommentInSong:songId
      }
    );
    await songModel.findByIdAndUpdate(
      songId ,
      { $inc: { count_comment: -1 } },
      { new: true }
    );
    await SongCommentModel.deleteOne({
      CommentByArtist:artistId,
      CommentInSong:songId
    })
    res.json("Comment Deleted");
  } catch (error) {
    next(error);
  }
};

exports.Total_Comment = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const totalcomment = await songModel.findById(songId );
    res.json(
      `Total comment in AlbumId  ${songId} is : ${totalcomment.count_comment}`
    );
  } catch (error) {
    next(error);
  }
};
