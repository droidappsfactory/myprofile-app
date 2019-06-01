const mongoose = require("mongoose");
const util = require("util");
const debug = require("debug")("express-mongoose-es6-rest-api:index");

const config = require("./config");

const mongoUri = 'mongodb://heroku_60bp6lsz:l8kkotopl2l12notqmvapifg5l@ds231207.mlab.com:31207/heroku_60bp6lsz' || 'mongodb://localhost/rotten-potatoes';
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
