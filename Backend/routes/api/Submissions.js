const express = require("express");
const router = express.Router();
const SubmissionController = require("../../controllers/Submissions");
router
  .route("/")
  .post(SubmissionController.submit);



module.exports = router;
