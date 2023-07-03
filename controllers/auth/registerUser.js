const { User } = require('../../models/user');
const { httpError } = require('../../helpers');

const registerUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, 'Email already in use');
  }

  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = registerUser;
