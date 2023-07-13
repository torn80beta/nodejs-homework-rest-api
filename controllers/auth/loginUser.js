const { User } = require('../../models/user');
const { httpError } = require('../../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, 'Invalid email or password');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, 'Invalid email or password');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  await User.findByIdAndUpdate(user._id, { token });

  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: 'hotbox80@gmail.com',
  //   from: 'auth_service@meta.ua',
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent');
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = loginUser;
