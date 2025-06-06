import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';
import dotenv from 'dotenv';

import Interest from './data/models/Interests.js';
import User from './data/models/User.js';
import Role from './data/models/Role.js';

import sessionConfig from './config/sessionConfig.js';
import connectDB from './data/db/index.js';
import { securityMiddleware, sanitizeInput } from './middleware/security.js';

import userRoutes from './routes/user.js';
import discoverRoutes from './routes/discover.js';
import messageRoutes from './routes/message.js';
import settingsRoutes from './routes/settings.js';
import notificationRoutes from './routes/notification.js';
import authRoutes from './routes/auth.js';
import router from './routes/index.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Güvenlik middleware'lerini uygula
app.use(securityMiddleware);
app.use(sanitizeInput);

app.use(cors({
  credentials: true,
  origin: true
}));

app.use(express.json());
app.use(sessionConfig);
app.use('/api', uploadRoutes);

// 🌱 Veritabanına rollerin tohumlanması
async function seedRoles() {
  const existing = await Role.countDocuments();
  if (existing === 0) {
    await Role.insertMany([
      { name: 'user' },
      { name: 'editor' },
      { name: 'admin' }
    ]);
    console.log("✅ Roller başarıyla yüklendi.");
  } else {
    console.log("ℹ️ Roller zaten mevcut.");
  }
}

// Giriş endpoint’i
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı." });

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) return res.status(400).json({ error: "Şifre hatalı." });

    res.json({ message: "Giriş başarılı", userId: user._id, username: user.username });
  } catch (err) {
    console.error("Login hatası:", err.message);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Kayıt endpoint’i
app.post('/api/register', async (req, res) => {
  const { username, email, password, profile } = req.body;

  try {
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({ error: "Bu kullanıcı adı veya email zaten var." });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, hashed_password, profile });

    await newUser.save();
    res.json({ message: "Kayıt başarılı", userId: newUser._id });
  } catch (err) {
    console.error("Kayıt hatası:", err.message);
    res.status(500).json({ error: "Kayıt sırasında hata oluştu." });
  }
});

// İlgi alanları endpoint’i
app.get('/api/interests', async (req, res) => {
  try {
    const interests = await Interest.find({});
    res.json(interests);
  } catch (err) {
    console.error("İlgi alanları alınamadı:", err.message);
    res.status(500).json({ error: 'Veri alınamadı' });
  }
});

// Test endpoint
app.get('/hello', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Merhaba, ${name}` });
});

// Geri kalan route'lar
app.use('/users', userRoutes);
app.use('/', discoverRoutes);
app.use('/', messageRoutes);
app.use('/', settingsRoutes);
app.use('/', notificationRoutes);
app.use('/', authRoutes);
app.use('/', router);

// Sunucuyu başlat
async function startServer() {
  try {
    await connectDB();
    await seedRoles();

    app.listen(PORT, () => {
      console.log(`🚀 Backend çalışıyor: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Sunucu başlatılamadı:", err.message);
  }
}

startServer();
