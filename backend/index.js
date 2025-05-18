import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import sessionMiddleware from './middleware/session.js';

const app = express();
const PORT = 6000;

app.use(cors({
    credentials: true
}));


app.use(express.json());
app.use(sessionMiddleware);


app.get('/hello',(req, res) => {
    res.json({message: `Merhaba`}); 
})

app.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`);
})