import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

import User from './data/models/User.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı (tercihe göre cloud ya da local)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://toprakkaya:1234@cluster0.jv0shqh.mongodb.net/webProgramlamaProjesi?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err.message);
    process.exit(1);
  });

// /api/register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password, profile } = req.body;

  try {
    // Aynı kullanıcı adı veya email varsa hata döndür
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({ error: "Bu kullanıcı adı veya email zaten var." });
    }

    // İlgi alanı kontrolü
    if (!Array.isArray(profile?.interests) || profile.interests.length === 0) {
      return res.status(400).json({ error: "En az bir ilgi alanı seçmelisiniz." });
    }

    // Şifre hashleme
    const hashed_password = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      hashed_password,
      profile,
      role: 'user', // Varsayılan rol
      is_online: false
    });

    await newUser.save();

    res.status(201).json({ message: "Kayıt başarılı", userId: newUser._id });
  } catch (err) {
    console.error("❌ Kayıt hatası:", err.message);
    res.status(500).json({ error: "Kayıt sırasında sunucu hatası oluştu." });
  }
});

// Sunucu dinleme
app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
