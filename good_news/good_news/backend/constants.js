const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "3001";


CONSTANTS.ENDPOINT.GETNEWS = "/getnews";
CONSTANTS.ENDPOINT.GETRANDOMNEWS = "/getrandomnews";
CONSTANTS.ENDPOINT.GETPROGRESSIVENEWS = "/getprogressivenews";
CONSTANTS.ENDPOINT.GETCOUNTRYWISECOUNT = "/getcountrywisenewscount"

CONSTANTS.ENDPOINT.MONGODB="mongodb+srv://readonly:readonly@gdelt2.rgl39.mongodb.net/GDELT?retryWrites=true&w=majority";


module.exports = CONSTANTS;
