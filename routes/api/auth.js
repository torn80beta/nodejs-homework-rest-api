const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post('/login', validateBody(schemas.loginSchema), ctrl.loginUser);

module.exports = router;
