const mongoose = require("mongoose");
const util = require("util");
const debug = require("debug")("express-mongoose-es6-rest-api:index");

const config = require("./config");

const mongoUri = config.mongo.host;
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connected on  ", mongoUri);
  })
  .catch(err => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
  });

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
