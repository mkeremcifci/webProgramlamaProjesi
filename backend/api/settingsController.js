let userSettings = {};
let blockedUsers = [];
let reports = [];


exports.updatePrivacy = (req, res) => {
  const userId = req.userId;
  const { visibility, ageRange, gender } = req.body;

  userSettings[userId] = {
    visibility: visibility ?? true,
    ageRange: ageRange ?? [18, 35],
    gender: gender ?? "all"
  };

  res.json({ message: "Ayarlar kaydedildi", settings: userSettings[userId] });
};


exports.blockUser = (req, res) => {
  const blockerId = req.userId;
  const blockedId = parseInt(req.params.userId);

  if (blockerId === blockedId) return res.status(400).json({ message: "Kendini engelleyemezsin" });

  const exists = blockedUsers.find(b => b.blockerId === blockerId && b.blockedId === blockedId);
  if (exists) return res.status(409).json({ message: "Zaten engellenmiş" });

  blockedUsers.push({ blockerId, blockedId });
  res.json({ message: `Kullanıcı (ID: ${blockedId}) engellendi.` });
};


exports.getBlockedUsers = (req, res) => {
  const userId = req.userId;
  const blocked = blockedUsers.filter(b => b.blockerId === userId).map(b => b.blockedId);
  res.json({ blockedUsers: blocked });
};


exports.reportUser = (req, res) => {
  const reporterId = req.userId;
  const reportedId = parseInt(req.params.userId);
  const { reason } = req.body;

  if (!reason) return res.status(400).json({ message: "Sebep gerekli" });

  reports.push({ reporterId, reportedId, reason, date: Date.now() });
  res.status(201).json({ message: "Kullanıcı şikayet edildi" });
};
