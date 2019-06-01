const Joi = require("joi");

require("dotenv").config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  PORT: Joi.number().default(1920),
  MONGO_HOST: Joi.string().description("Mongo DB host url"),
  MONGO_PORT: Joi.number().default(27017),
  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  LOGS_FOLDER: Joi.string().description('folder where logs are stored')
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    frontend: envVars.MEAN_FRONTEND || 'angular',
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    },
    logsFolder: envVars.LOGS_FOLDER
};

module.exports = config;
