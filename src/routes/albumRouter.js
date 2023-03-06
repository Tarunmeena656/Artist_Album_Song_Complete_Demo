const { Router } = require("express");
const { validate } = require("express-validation");
const passport = require("passport");
const {
  createAlbum,
  getAllAlbum,
  getAlbumById,
  updateAlbumById,
  deletedAlbumById,
  Album_Likes,
  Album_dislike,
  total_Like_Count,
} = require("../controller/albumController");
const hasRole = require("../middleware/auth");
const {
  createAlbumValidation,
  getAllAlbumValidation,
  getAllAlbumByIdValidation,
  deleteAlbumByIdValidation,
  updateAlbumByIdValidation,
} = require("../validation/albumValidation");
const albumRouter = Router({ mergeParams: true });
require("../middleware/auth");

albumRouter.post(
  "/",
  validate(createAlbumValidation),
  passport.authenticate("jwt", { session: false }),
  createAlbum
);

albumRouter.get(
  "/",
  validate(getAllAlbumValidation),
  passport.authenticate("jwt", { session: false }),
  getAllAlbum
);

albumRouter.get(
  "/:albumId",
  validate(getAllAlbumByIdValidation),
  passport.authenticate("jwt", { session: false }),
  getAlbumById
);

albumRouter.put(
  "/:albumId",
  validate(updateAlbumByIdValidation),
  passport.authenticate("jwt", { session: false }),
  updateAlbumById
);

albumRouter.delete(
  "/:albumId",
  validate(deleteAlbumByIdValidation),
  passport.authenticate("jwt", { session: false }),
  hasRole([ "artist"]),
  deletedAlbumById
);

albumRouter.put("/:albumId/like", Album_Likes);
albumRouter.put("/:albumId/dislike", Album_dislike);
albumRouter.get("/:albumId/Total_Likes", total_Like_Count);

module.exports = albumRouter;
