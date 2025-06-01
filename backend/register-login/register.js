import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from './data/models/User.js'; 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://toprakkaya:1234@cluster0.jv0shqh.mongodb.net/webProgramlamaProjesi?retryWrites=true&w=majority")
  .then(() => console.log(" MongoDB bağlantısı başarılı"))
  .catch((err) => console.error(" Bağlantı hatası:", err.message));

app.post('/api/register', async (req, res) => {
  const { username, email, password, profile } = req.body;
  try {
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({ error: "Bu kullanıcı adı veya email zaten var." });
    }
  if (!Array.isArray(profile.interests) || profile.interests.length === 0) {
    return res.status(400).json({ error: "En az bir ilgi alanı seçmelisiniz." });
}

    const hashed_password = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      hashed_password,
      profile,
      role: 'user', 
    });

    await newUser.save();
    res.json({ message: "Kayıt başarılı", userId: newUser._id });
  } catch (err) {
    console.error(" Kayıt hatası:", err.message);
    res.status(500).json({ error: "Kayıt sırasında hata oluştu." });
  }
});


app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
