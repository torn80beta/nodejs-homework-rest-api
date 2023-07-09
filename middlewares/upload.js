const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'tmp');
const multerConfig = multer.diskStorage({
  destination: tempDir,

  // Additional settings:
  // limits: {
  //   fileSize: 1048576,
  // },
  // If you ned to rename file on save, use this:
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb - callBack function
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
