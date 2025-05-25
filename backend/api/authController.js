const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = []; 
let refreshTokens = [];


const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_SECRET || 'refreshsecret');
  refreshTokens.push(token);
  return token;
};


exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: 'E-posta zaten kayıtlı' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    email,
    name,
    password: hashedPassword
  };
  users.push(newUser);
  res.status(201).json({ message: 'Kayıt başarılı' });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Geçersiz bilgiler' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Geçersiz bilgiler' });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.json({ accessToken, refreshToken });
};


exports.logout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.json({ message: 'Çıkış yapıldı' });
};


exports.refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Geçersiz refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET || 'refreshsecret');
    const newAccessToken = generateAccessToken(decoded.userId);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Token doğrulanamadı' });
  }
};