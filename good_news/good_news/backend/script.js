const { MongoClient } = require("mongodb");
const { parser } = require("html-metadata-parser");

const CONSTANTS = require("./constants");
const mongoClient = new MongoClient(CONSTANTS.ENDPOINT.MONGODB_JOHN);

const gett = async () => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("gdelt");
    const collection = database.collection("events");
    const newsWithoutInfo = await collection
      .find({
        Info: { $exists: false },
        SOURCEURL: { $exists: true },
      })
      .project({
        _id: 1,
        SOURCEURL: 1,
      })
      .skip(50)
      .toArray();

    for (let i = 0; i < newsWithoutInfo.length; i++) {
      try {
        let result = await parser(newsWithoutInfo[i].SOURCEURL);
        // console.log(JSON.stringify(result, null, 4));
        await collection.updateOne(
          {
            _id: newsWithoutInfo[i]._id,
          },
          {
            $set: {
              Info: {
                meta: result.meta,
                og: result.og,
              },
            },
          }
        );
      } catch (e) {
        if (![403, 404, 503].includes(e.response.status)) {
          console.error(e);
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoClient.close();
  }
};
gett();
