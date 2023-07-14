const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');
const user_auth = require('../middleware/user_auth');
const admin_auth = require('../middleware/admin_auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', admin_auth, userCtrl.getAllUsers);
router.get('/:id/checkin', user_auth, userCtrl.userCheckIn);
router.get('/:id', user_auth, userCtrl.getOneUser);
router.get('/all/memberships', admin_auth ,userCtrl.getAllUsersWithMembership);

module.exports = router;