const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "3001";
CONSTANTS.ENDPOINT.LIST = "/list";

CONSTANTS.ENDPOINT.GRID = "/grid";

CONSTANTS.ENDPOINT.GETNEWS = "/getnews";
CONSTANTS.ENDPOINT.GETNEWSCOUNT = "/getnewscount";
CONSTANTS.ENDPOINT.SEARCHNEWS = "/searchnews";
CONSTANTS.ENDPOINT.COUNTRYWISEGETNEWS = "/getCountrywiseNews";

CONSTANTS.ENDPOINT.MONGODB="mongodb+srv://readonly:readonly@gdelt2.rgl39.mongodb.net/GDELT?retryWrites=true&w=majority";


module.exports = CONSTANTS;
