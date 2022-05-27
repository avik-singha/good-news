const CONSTANTS = require("../constants");
const express = require("express");
const newsController = require('../controller/events');
const recentNewsController = require('../controller/recentevents');
const router = express.Router();

router.post(CONSTANTS.ENDPOINT.COUNTRYWISEGETNEWS,newsController.getCountryAndYearwiseNews);
router.get(CONSTANTS.ENDPOINT.GETNEWS+ "/:pageno",newsController.getGoodNews);
router.get(CONSTANTS.ENDPOINT.GETRANDOMNEWS,newsController.getRandomGoodNews);
router.post(CONSTANTS.ENDPOINT.GETPROGRESSIVENEWS,newsController.getProgressiveGoodNews);
router.post(CONSTANTS.ENDPOINT.GETDAYWISEGOODNEWSCOUNT,newsController.getDayWiseGoodNewsCount);

// router.post(CONSTANTS.ENDPOINT.COUNTRYWISEGETNEWS,recentNewsController.getCountryAndYearwiseNews);
// router.get(CONSTANTS.ENDPOINT.GETNEWS+ "/:pageno",recentNewsController.getGoodNews);
// router.get(CONSTANTS.ENDPOINT.GETRANDOMNEWS,recentNewsController.getRandomGoodNews);
// router.post(CONSTANTS.ENDPOINT.GETPROGRESSIVENEWS,recentNewsController.getProgressiveGoodNews);
// router.post(CONSTANTS.ENDPOINT.GETDAYWISEGOODNEWSCOUNT,recentNewsController.getDayWiseGoodNewsCount);



module.exports = router;
