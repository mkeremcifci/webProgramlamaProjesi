import express from 'express';
import cors from 'cors';
import session from 'express-session';

import sessionConfig from './config/sessionConfig.js';
import router from './routes/index.js';
import connectDB from './data/db/index.js'
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const discoverRoutes = require('./routes/discover');
const messageRoutes = require('./routes/message');
const settingsRoutes = require('./routes/settings');
const notificationRoutes = require('./routes/notification');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = 6000;

app.use(cors({
    credentials: true
}));

app.use(express.json());

app.use(sessionConfig)

connectDB()

app.use('/users', userRoutes);
app.use('/', discoverRoutes);
app.use('/', messageRoutes);
app.use('/', settingsRoutes);
app.use('/', notificationRoutes);
app.use('/', authRoutes);
app.use('/',router);


app.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`);
})
