const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticate = require('../middleware/authMiddleware');

router.get('/matches/:matchId/messages', authenticate, messageController.getMessages);
router.post('/matches/:matchId/messages', authenticate, messageController.sendMessage);
router.delete('/messages/:messageId', authenticate, messageController.deleteMessage);

module.exports = router;
