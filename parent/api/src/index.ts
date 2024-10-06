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

app.post('/generate-token', async (req, res) => {
    const {id, nome, email, empresa, cnpj} = req
    const token = jwt.sign({id, nome, email, empresa, cnpj}, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token });
});
  

app.use('/', routes);

app.listen(PORT, async () => {
    console.log(dotenv.config());

    try{

        const adminForTest = {
            "nome": "adm",
            "senha": "adm",
            "email": "adm@example.com",
            "empresa": "Exemplo S/A",
            "cnpj": "12.345.678/0001-95"
          }

          const [admin, created] = await Admin.findOrCreate({
            where: { email: adminForTest.email },
            defaults: adminForTest,
        });

        if (created) {
            console.log(`Admin ${adminForTest.nome} criado com sucesso.`);
        } else {
            console.log(`Admin ${adminForTest.nome} já existe.`);
        }


        console.log(`Servidor rodando na porta ${PORT}`);
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
});