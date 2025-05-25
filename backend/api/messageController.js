let messages = []; // { id, matchId, senderId, content, timestamp }
let matches = [
  { user1: 1, user2: 2, id: 100 },
  { user1: 3, user2: 1, id: 101 }
];


const isUserInMatch = (match, userId) => match.user1 === userId || match.user2 === userId;


exports.getMessages = (req, res) => {
  const matchId = parseInt(req.params.matchId);
  const userId = req.userId;

  const match = matches.find(m => m.id === matchId);
  if (!match || !isUserInMatch(match, userId)) {
    return res.status(403).json({ message: 'Bu eşleşmeye erişiminiz yok' });
  }

  const chatMessages = messages
    .filter(m => m.matchId === matchId)
    .sort((a, b) => a.timestamp - b.timestamp);

  res.json(chatMessages);
};


exports.sendMessage = (req, res) => {
  const matchId = parseInt(req.params.matchId);
  const { content } = req.body;
  const userId = req.userId;

  const match = matches.find(m => m.id === matchId);
  if (!match || !isUserInMatch(match, userId)) {
    return res.status(403).json({ message: 'Bu eşleşmeye mesaj atamazsınız' });
  }

  const newMessage = {
    id: Date.now(),
    matchId,
    senderId: userId,
    content,
    timestamp: Date.now()
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
};


exports.deleteMessage = (req, res) => {
  const messageId = parseInt(req.params.messageId);
  const userId = req.userId;

  const index = messages.findIndex(m => m.id === messageId);
  if (index === -1) return res.status(404).json({ message: 'Mesaj bulunamadı' });

  const message = messages[index];
  if (message.senderId !== userId) {
    return res.status(403).json({ message: 'Sadece kendi mesajınızı silebilirsiniz' });
  }

  messages.splice(index, 1);
  res.json({ message: 'Mesaj silindi' });
};
