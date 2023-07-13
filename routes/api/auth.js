const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post('/login', validateBody(schemas.loginSchema), ctrl.loginUser);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  // for multiple files use this:
  // upload.array("avatar", 8)

  // for multiple files in different fields, use this:
  // upload.fields([{name: "avatar1", maxCount: 3"}, {name: "avatar2", maxCount: 5"}])
  ctrl.updateAvatar
);

module.exports = router;
