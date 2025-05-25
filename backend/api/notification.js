let notifications = [
  { id: 1, userId: 1, content: "Zeynep seni beğendi", seen: false, timestamp: Date.now() },
  { id: 2, userId: 1, content: "Yeni eşleşmen var!", seen: false, timestamp: Date.now() },
  { id: 3, userId: 2, content: "Ali sana mesaj gönderdi", seen: true, timestamp: Date.now() }
];


exports.getNotifications = (req, res) => {
  const userId = req.userId;
  const userNotifications = notifications
    .filter(n => n.userId === userId)
    .sort((a, b) => b.timestamp - a.timestamp);

  res.json(userNotifications);
};


exports.markAllAsSeen = (req, res) => {
  const userId = req.userId;

  notifications.forEach(n => {
    if (n.userId === userId) n.seen = true;
  });

  res.json({ message: "Tüm bildirimler okundu olarak işaretlendi." });
};
