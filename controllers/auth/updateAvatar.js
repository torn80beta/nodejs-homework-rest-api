const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');
const Jimp = require('jimp');

const updateAvatar = async (req, res) => {
  //   console.log(req.body);
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tempUpload)
    .then(image => {
      return image.scaleToFit(250, 250).write(resultUpload);
    })
    .catch(err => {
      console.log(err);
    });

  await fs.unlink(tempUpload);
  // without Jimp:
  // await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);

  await User.findByIdAndUpdate(_id, {
    avatarURL,
  });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
