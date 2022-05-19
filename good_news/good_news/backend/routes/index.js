const CONSTANTS = require("../constants");
const express = require("express");
const newsController = require('../controller/index');
const router = express.Router();

router.get(CONSTANTS.ENDPOINT.GETNEWS+ "/:pageno",newsController.getNews);
router.post(CONSTANTS.ENDPOINT.COUNTRYWISEGETNEWS,newsController.getCountrywiseNews);
router.get(CONSTANTS.ENDPOINT.GETNEWS+ "/:pageno",newsController.getGoodNews);
router.get(CONSTANTS.ENDPOINT.GETRANDOMNEWS,newsController.getRandomGoodNews);
router.post(CONSTANTS.ENDPOINT.GETPROGRESSIVENEWS,newsController.getProgressiveGoodNews);
router.post(CONSTANTS.ENDPOINT.GETCOUNTRYWISECOUNT,newsController.getCountryWiseGoodNewsCount);

module.exports = router;
