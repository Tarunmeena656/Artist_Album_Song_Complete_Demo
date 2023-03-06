const { Router } = require("express");
const indexRouter = Router();
const artistRouter = require("./artistRoutes");
const albumRouter = require("./albumRouter");
const songRouter = require("./songRouter");

indexRouter.use("/artists", artistRouter);
indexRouter.use("/artists/:artistId/albums", albumRouter);
indexRouter.use("/artists/:artistId/albums/:albumId/songs", songRouter);


module.exports = indexRouter;
