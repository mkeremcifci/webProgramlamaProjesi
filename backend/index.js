import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 6000;

app.use(cors());
app.use(express.json());

app.get('/hello',(req, res) => {
    const { name } = req.body;
    res.json({message: `Merhaba, ${name}`}); 
})

app.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`);
})