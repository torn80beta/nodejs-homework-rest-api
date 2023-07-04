const jwt = require('jsonwebtoken');
const { httpError } = require('../helpers');
const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(httpError(401));
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    next(httpError(401));
  }
};

module.exports = authenticate;
