const { httpError } = require('../../helpers');
const { User } = require('../../models/user');
const { sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, 'User not fount');
  }
  if (user.verify) {
    throw httpError(401, 'Email already verified');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verification  email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Follow this link to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: 'Verification email sent' });
};

module.exports = resendVerificationEmail;
