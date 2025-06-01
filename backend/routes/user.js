const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

router.get('/me', authenticate, userController.getMyProfile);
router.put('/me', authenticate, userController.updateMyProfile);
router.delete('/me', authenticate, userController.deleteMyProfile);
router.get('/:id', authenticate, userController.getUserById);
router.post('/me/photos', authenticate, userController.uploadPhoto);
router.delete('/me/photos/:photoId', authenticate, userController.deletePhoto);

module.exports = router;
