const { Router } = require("express");
const { validate } = require("express-validation");
const passport = require("passport");

const {
  createSong,
  getAllSong,
  getSongById,
  updateSongById,
  deleteSongById,
  Comment,
  DeleteComment,
  Total_Comment,
} = require("../controller/songController");
const hasRole = require("../middleware/auth");

const {
  createSongValidation,
  getAllSongValidation,
  getAllSongByIdValidation,
  updateSongByIdValidation,
  deleteSongByIdValidation,
} = require("../validation/songValidation");

const songRouter = Router({ mergeParams: true });
require("../middleware/auth");



songRouter.post(
  "/",
  validate(createSongValidation),
  passport.authenticate("jwt", { session: false }),
  createSong
);


songRouter.get(
  "/",
  validate(getAllSongValidation),
  passport.authenticate("jwt", { session: false }),
  getAllSong
);


songRouter.get(
  "/:songId",
  validate(getAllSongByIdValidation),
  passport.authenticate("jwt", { session: false }),
  getSongById
);


songRouter.put(
  "/:songId",
  validate(updateSongByIdValidation),
  passport.authenticate("jwt", { session: false }),
  updateSongById
);


songRouter.delete(
  "/:songId",
  validate(deleteSongByIdValidation),
  passport.authenticate("jwt", { session: false }),
  hasRole(["admin"]),
  deleteSongById
);


songRouter.put("/:songId/comment", Comment);
songRouter.put("/:songId/DeleteComment", DeleteComment);
songRouter.get("/:songId/Total_Comment", Total_Comment);

module.exports = songRouter;
