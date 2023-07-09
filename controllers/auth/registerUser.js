const { User } = require('../../models/user');
const { httpError } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    // name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = registerUser;
