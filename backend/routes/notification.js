const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticate = require('../middleware/authMiddleware');

router.get('/notifications', authenticate, notificationController.getNotifications);
router.post('/notifications/seen', authenticate, notificationController.markAllAsSeen);

module.exports = router;
