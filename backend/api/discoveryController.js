let users = [
  { id: 1, name: 'Ali', gender: 'male', interests: ['spor'], age: 25 },
  { id: 2, name: 'Ayşe', gender: 'female', interests: ['kitap'], age: 24 },
  { id: 3, name: 'Zeynep', gender: 'female', interests: ['yoga'], age: 28 },
  { id: 4, name: 'Mehmet', gender: 'male', interests: ['müzik'], age: 30 }
];


let swipes = [];
let matches = [];


exports.getDiscoverList = (req, res) => {
  const currentUserId = req.userId;
  const seenIds = swipes.filter(s => s.from === currentUserId).map(s => s.to);
  const discoverable = users.filter(u => u.id !== currentUserId && !seenIds.includes(u.id));
  res.json(discoverable);
};


exports.sendSwipe = (req, res) => {
  const currentUserId = req.userId;
  const { targetUserId, direction } = req.body;

  if (!['left', 'right'].includes(direction)) {
    return res.status(400).json({ message: 'Geçersiz yön' });
  }

  swipes.push({ from: currentUserId, to: targetUserId, direction });


  const isMatch = swipes.find(
    s => s.from === targetUserId && s.to === currentUserId && s.direction === 'right'
  );

  if (direction === 'right' && isMatch) {
    matches.push({ user1: currentUserId, user2: targetUserId });
    return res.json({ match: true, message: 'Eşleşme oldu!' });
  }

  res.json({ match: false, message: 'Swipe kaydedildi' });
};


exports.getMatches = (req, res) => {
  const currentUserId = req.userId;
  const matchedUsers = matches
    .filter(m => m.user1 === currentUserId || m.user2 === currentUserId)
    .map(m => {
      const matchId = m.user1 === currentUserId ? m.user2 : m.user1;
      return users.find(u => u.id === matchId);
    });

  res.json(matchedUsers);
};
