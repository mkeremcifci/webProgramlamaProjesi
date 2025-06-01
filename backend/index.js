import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Interest from './data/models/Interests.js';
import bcrypt from 'bcrypt'; 
import User from './data/models/User.js'; 
import Role from './data/models/Role.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


async function seedRoles() {
  const existing = await Role.countDocuments();
  if (existing === 0) {
    await Role.insertMany([
      { name: 'user' },
      { name: 'editor' },
      { name: 'admin' }
    ]);
    console.log(" Roller başarıyla yüklendi.");
  } else {
    console.log("ℹ Roller zaten mevcut.");
  }
}
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı." });

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) return res.status(400).json({ error: "Şifre hatalı." });

    res.json({ message: "Giriş başarılı", userId: user._id, username: user.username });
  } catch (err) {
    console.error(" Login hatası:", err.message);
    res.status(500).json({ error: "Sunucu hatası" });
  }
  });

// Endpoint'leri tanımla
app.get('/hello', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Merhaba, ${name}` });
});

app.get('/api/interests', async (req, res) => {
  try {
    console.log(" /api/interests isteği geldi");
    const interests = await Interest.find({});
    console.log(" İlgi alanları bulundu:", interests.length);
    res.json(interests);
  } catch (err) {
    console.error("İlgi alanları alınamadı:", err.message);
    res.status(500).json({ error: 'Veri alınamadı' });
  }
});

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
    console.error(" Kayıt hatası:", err.message);
    res.status(500).json({ error: "Kayıt sırasında hata oluştu." });
  }
});

// 🔧 Uygulamayı çalıştıran asıl fonksiyon
async function startServer() {
  try {
    await mongoose.connect("mongodb+srv://toprakkaya:1234@cluster0.jv0shqh.mongodb.net/webProgramlamaProjesi?retryWrites=true&w=majority");
    console.log(" MongoDB bağlantısı başarılı");

    app.listen(PORT, () => {
      console.log(` Backend çalışıyor: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" MongoDB bağlantı hatası:", err.message);
  }
}

startServer(); // Uygulamayı başlat
