const fs = require("fs");
const httpStatus = require("http-status");
const path = require("path");

exports.getResume = (req, res, next) => {
  try {
    const fileName = req.params.fileName;

    console.log("requested file ", fileName);

    const filepath = path.join(__dirname, "../../public/") + fileName;

    res.sendFile(filepath, err => {
      if (err) {
        next(err);
      } else {
        console.log("Sent:", filepath);
      }
    });
  } catch (e) {
    next(e);
  }
};
