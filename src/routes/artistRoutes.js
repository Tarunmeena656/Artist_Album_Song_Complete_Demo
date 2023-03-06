const { Router } = require("express");
const { validate } = require("express-validation");
const passport = require("passport");
const {
  createArtist,
  getAllArtists,
  getArtistById,
  updatedArtistById,
  deleteArtistById,
  loginArtist,
} = require("../controller/artistController");
const hasRole = require("../middleware/auth");
const {
  loginValidation,
  createArtistValidation,
  getArtistByIdValidation,
  updateArtistByIdValidation,
  deleteArtistByIdValidation,
} = require("../validation/artistValidation");
const artistRouter = Router({ mergeParams: true });
require("../middleware/auth");

artistRouter.post("/", validate(createArtistValidation), createArtist);
artistRouter.post(
  "/login",
  validate(loginValidation),
  passport.authenticate("login", { session: false }),
  loginArtist
);
artistRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllArtists
);
artistRouter.get(
  "/:artistId",
  validate(getArtistByIdValidation),
  passport.authenticate("jwt", { session: false }),
  getArtistById
);
artistRouter.put(
  "/:artistId",
  validate(updateArtistByIdValidation),
  passport.authenticate("jwt", { session: false }),
  updatedArtistById
);
artistRouter.delete(
  "/:artistId",
  validate(deleteArtistByIdValidation),
  passport.authenticate("jwt", { session: false }),
  hasRole(["artist"]),
  deleteArtistById
);

module.exports = artistRouter;
