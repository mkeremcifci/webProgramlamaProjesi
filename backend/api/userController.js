let users = [
  { id: 1, name: 'Ali', email: 'ali@mail.com', password: 'hashed', photos: [] },
  { id: 2, name: 'Ayşe', email: 'ayse@mail.com', password: 'hashed', photos: [] }
];

exports.getMyProfile = (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  res.json(user);
};

exports.updateMyProfile = (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'Kullanıcı yok' });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: 'Profil güncellendi', user });
};

exports.deleteMyProfile = (req, res) => {
  const index = users.findIndex(u => u.id === req.userId);
  if (index === -1) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

  users.splice(index, 1);
  res.json({ message: 'Kullanıcı silindi' });
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Kullanıcı yok' });
  res.json(user);
};

exports.uploadPhoto = (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'Kullanıcı yok' });

  const { photoUrl } = req.body;
  if (!photoUrl) return res.status(400).json({ message: 'Fotoğraf URL gerekli' });

  user.photos.push(photoUrl);
  res.json({ message: 'Fotoğraf eklendi', photos: user.photos });
};

exports.deletePhoto = (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'Kullanıcı yok' });

  const index = parseInt(req.params.photoId);
  if (isNaN(index) || index < 0 || index >= user.photos.length) {
    return res.status(400).json({ message: 'Geçersiz foto ID' });
  }

  user.photos.splice(index, 1);
  res.json({ message: 'Fotoğraf silindi', photos: user.photos });
};
