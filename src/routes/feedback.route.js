const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const asyncHandler = require("express-async-handler");

const feedbackValidate = require("../validations/feedback.validation");
const feedbackController = require("../controllers/feedback.controller");

router
  .route("/request")
  .post(
    validate(feedbackValidate.save),
    asyncHandler(feedbackController.saveFeedback)
  );

router
  .route("/request/:name")
  .get(
    validate(feedbackValidate.fetch),
    asyncHandler(feedbackController.getFeedbacks)
  );

module.exports = router;
