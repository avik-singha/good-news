const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "3001";


CONSTANTS.ENDPOINT.GETNEWS = "/getnews";
CONSTANTS.ENDPOINT.GETNEWSCOUNT = "/getnewscount";
CONSTANTS.ENDPOINT.SEARCHNEWS = "/searchnews";
CONSTANTS.ENDPOINT.COUNTRYWISEGETNEWS = "/getCountrywiseNews";

CONSTANTS.ENDPOINT.GETRANDOMNEWS = "/getrandomnews";
CONSTANTS.ENDPOINT.GETPROGRESSIVENEWS = "/getprogressivenews";
CONSTANTS.ENDPOINT.GETDAYWISEGOODNEWSCOUNT = "/getdaywiseposnewscount";


CONSTANTS.ENDPOINT.MONGODB_READONLY =
  "mongodb+srv://readonly:readonly@gdelt2.rgl39.mongodb.net/GDELT?retryWrites=true&w=majority";
CONSTANTS.ENDPOINT.MONGODB_JOHN =
  "mongodb+srv://john:goodnews@gdelt.n1mbb.mongodb.net/?retryWrites=true&w=majority";

module.exports = CONSTANTS;
