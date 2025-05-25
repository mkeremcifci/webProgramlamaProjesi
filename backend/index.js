import express from 'express';
import cors from 'cors';
import session from 'express-session';

import sessionConfig from './config/sessionConfig.js';
import router from './routes/index.js';

const app = express();
const PORT = 6000;


app.use(cors({
    credentials: true
}));

app.use(sessionConfig)

app.use(express.json());

app.use('/',router);

app.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`);
})