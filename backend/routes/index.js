import express, { Router } from 'express';
import sessionControl from '../middleware/session.js';

const router = express.Router();

/* Kullanıcı giriş yapmadan erişebiliceği routlar */

router.use(sessionControl)

/* Kullanıcının giriş yapması gereken routlar */

export default router;