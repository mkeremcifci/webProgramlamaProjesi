const express = require('express');
const router = express.Router();
const multer = require('multer');
const ContentModeration = require('../utils/contentModeration');

// Multer configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Image moderation endpoint
router.post('/moderate-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image not uploaded' });
        }

        const moderationResult = await ContentModeration.moderateImage(req.file.buffer);
        res.json(moderationResult);
    } catch (error) {
        console.error('Image moderation error:', error);
        res.status(500).json({ error: 'An error occurred during image moderation' });
    }
});

// Text moderation endpoint
router.post('/moderate-text', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text not provided' });
        }

        const moderationResult = await ContentModeration.moderateText(text);
        res.json(moderationResult);
    } catch (error) {
        console.error('Text moderation error:', error);
        res.status(500).json({ error: 'An error occurred during text moderation' });
    }
});

module.exports = router;