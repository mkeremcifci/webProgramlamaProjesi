import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';


const storage = multer.memoryStorage();
export const upload = multer({ storage });

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenmedi.' });
    }

    const filename = `avatar-${Date.now()}.jpeg`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // sharp ile işlem yap (256x256, jpeg formatında ve %80 kalite)
    await sharp(req.file.buffer)
      .resize(256, 256)
      .jpeg({ quality: 80 })
      .toFile(filepath);

    res.status(200).json({ message: 'Yükleme başarılı', filename });
  } catch (error) {
    console.error('Yükleme hatası:', error.message);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
