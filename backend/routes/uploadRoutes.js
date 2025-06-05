import express from 'express';
import { upload, uploadAvatar } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);

export default router;
