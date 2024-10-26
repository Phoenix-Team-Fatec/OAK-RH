import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';
import Admin from './models/adminModels';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

//Rota para criação de token
app.post('/generate-token', async (req, res) => {
    const { id, nome, email, empresa, cnpj, id_admin, equipe_id } = req.body;
    const isAdmin = !!cnpj;

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET não está definido' });
    }

    const token = jwt.sign({ id, nome, email, empresa, cnpj, id_admin, isAdmin, equipe_id  }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});
  

app.use('/', routes);

app.listen(PORT, async () => {
    console.log(dotenv.config());

    try{

        console.log(`Servidor rodando na porta ${PORT}`);
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
});