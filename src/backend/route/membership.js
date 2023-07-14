const express = require('express');
const router = express.Router();
const membershipCtrl = require('../controller/membership');
const admin_auth = require('../middleware/admin_auth');
const user_auth = require('../middleware/user_auth');

router.post('/', membershipCtrl.createMembership);
router.get('/user/:id', user_auth, membershipCtrl.getMembershipOfUser);
router.put('/:id', admin_auth, membershipCtrl.updateMembership);
router.delete('/:id', admin_auth, membershipCtrl.deleteMembership);

module.exports = router;
