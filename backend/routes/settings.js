const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authenticate = require('../middleware/authMiddleware');

router.post('/settings/privacy', authenticate, settingsController.updatePrivacy);
router.post('/settings/block/:userId', authenticate, settingsController.blockUser);
router.get('/settings/blocked', authenticate, settingsController.getBlockedUsers);
router.post('/settings/report/:userId', authenticate, settingsController.reportUser);

module.exports = router;
