const CONSTANTS = require("../constants");
const express = require("express");
const newsController = require('../controller/index');
const router = express.Router();

router.get(CONSTANTS.ENDPOINT.GETNEWS+ "/:pageno",newsController.getNews);

module.exports = router;
