const { ctrlWrapper } = require('../../helpers');
const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const getCurrent = require('./getCurrent');
const logout = require('./logout');

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
