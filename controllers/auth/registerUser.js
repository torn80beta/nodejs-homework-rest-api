const { User } = require('../../models/user');
const { httpError, sendEmail } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verification  email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Follow this link to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    // name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = registerUser;
