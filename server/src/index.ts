import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(dotenv.config());
    
    console.log(`Servidor rodando na porta ${PORT}`);
});

