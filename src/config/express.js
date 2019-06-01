const express = require("express");
const httpError = require('http-errors');
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const config = require("./config");
const routes = require('../routes/index.route');

const app = express();

console.log(__dirname);

if (config.env !== "development") {
  var accessLogStream = fs.createWriteStream(
    path.join(config.logsFolder, "access.log"),
    { flags: "a" }
  );
  app.use(
    logger(":method :url :status :res[content-length] - :response-time ms", {
      stream: accessLogStream
    })
  );
} else {
  app.use(logger("tiny"));
}

var distDir = "../../dist/";

app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))


app.use("/api", routes);

app.use((req,res,next) => {
  const err = new httpError(404)
  return next(err);
})

// error handler, send stacktrace only during development

app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
