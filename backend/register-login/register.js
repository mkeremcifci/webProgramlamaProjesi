import express from 'express';
import mongoose from 'mongoose';
import User from './data/models/User.js'; // Bu model dosyasının mevcut olduğunu varsayıyoruz

const app = express();
const PORT = 6060;

app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/webProgramlamaProjesi')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

// /register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Bu kullanıcı zaten mevcut.' });
    }

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      hashed_password: password, // Gerçekte hashlenmeli
      profile,
      is_online: false
    });

    await newUser.save();

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu aktif: http://localhost:${PORT}/register`);
});
