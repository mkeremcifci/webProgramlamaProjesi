const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const discoverRoutes = require('./routes/discover');
const messageRoutes = require('./routes/message');
const settingsRoutes = require('./routes/settings');
const notificationRoutes = require('./routes/notification');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/', discoverRoutes);
app.use('/', messageRoutes);
app.use('/', settingsRoutes);
app.use('/', notificationRoutes);


app.listen(process.env.PORT || 3000, () => {
  console.log('Sunucu çalışıyor...');
});
