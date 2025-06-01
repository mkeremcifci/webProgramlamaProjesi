const express = require('express');
const router = express.Router();
const discoverController = require('../controllers/discoverController');
const authenticate = require('../middleware/authMiddleware');

router.get('/discover', authenticate, discoverController.getDiscoverList);
router.post('/swipe', authenticate, discoverController.sendSwipe);
router.get('/matches', authenticate, discoverController.getMatches);

module.exports = router;
