const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');
  console.log(avatarsDir);
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);

  await User.findByIdAndUpdate(_id, {
    avatarURL,
  });

  res.json({ avatarURL });
  //   console.log(req.body);
  //   console.log(req.file);
};

module.exports = updateAvatar;
