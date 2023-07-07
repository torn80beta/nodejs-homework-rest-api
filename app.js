const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');
const multer = require('multer');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
/* This checks if request body has correct json format */
app.use(express.json());

/* Move this section to multer middlewares */

const path = require('path');
const fs = require('fs/promises');
const tempDir = path.join(__dirname, 'tmp');
const multerConfig = multer.diskStorage({
  destination: tempDir,

  // Additional settings:
  // limits: {
  //   fileSize: 1048576,
  // },
  // If you ned to rename file on save, use this:
  // filename: (req, file, cb) => {
  //   cb(null, file.originalname);
  // },
});

const upload = multer({
  storage: multerConfig,
});

/* ^^^^^^ */

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

/* Move upload.single('avatar') to auth router */

app.post('/register', upload.single('avatar'), async (req, res) => {
  /* !!! Move this section to registerUser controller !!! */
  const { path: tempUpload, originalname } = req.file;
  const avatarsDir = path.join(__dirname, 'public', 'avatars');
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join('public', 'avatars', originalname);

  /* Part of existing controller */
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar,
  });
  // console.log(req.body);
  // console.log(req.file);
});

// for multiple files use this:
// upload.array("avatar", 8)

// for multiple files in different fields, use this:
// upload.fields([{name: "avatar1", maxCount: 3"}, {name: "avatar2", maxCount: 5"}])

/* ^^^ Move to registerUser controller ^^^ */

/* Error handler */
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error ' } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
