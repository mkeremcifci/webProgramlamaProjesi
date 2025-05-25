import express from 'express';
  import cors from 'cors';

  const app = express();
  const PORT = 6000;
  const express = require('express');
  const dotenv = require('dotenv');
  const userRoutes = require('./routes/user');
  const discoverRoutes = require('./routes/discover');
  const messageRoutes = require('./routes/message');
  const settingsRoutes = require('./routes/settings');
  const notificationRoutes = require('./routes/notification');
  const authRoutes = require('./routes/auth');

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRoutes);
  app.use('/', discoverRoutes);
  app.use('/', messageRoutes);
  app.use('/', settingsRoutes);
  app.use('/', notificationRoutes);
  app.use('/', authRoutes);

  app.get('/hello',(req, res) => {
      const { name } = req.body;
      res.json({message: `Merhaba, ${name}`});
  })

  app.listen(PORT,()=>{
      console.log(`Listening on port:${PORT}`);
  })
