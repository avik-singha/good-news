const CONSTANTS = require("../constants");
const express = require("express");
const newsController = require('../controller/index');
const router = express.Router();

router.post(CONSTANTS.ENDPOINT.COUNTRYWISEGETNEWS,newsController.getCountryAndYearwiseNews);
router.get(CONSTANTS.ENDPOINT.GETNEWS+ "/:pageno",newsController.getGoodNews);
router.get(CONSTANTS.ENDPOINT.GETRANDOMNEWS,newsController.getRandomGoodNews);
router.post(CONSTANTS.ENDPOINT.GETPROGRESSIVENEWS,newsController.getProgressiveGoodNews);
router.post(CONSTANTS.ENDPOINT.GETDAYWISEGOODNEWSCOUNT,newsController.getDayWiseGoodNewsCount);



module.exports = router;
