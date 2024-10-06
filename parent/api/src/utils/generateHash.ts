// Arquivo: generateHash.ts

import bcrypt from 'bcrypt';

const generateHashedPassword = async () => {
    const senha = 'admin'; // A senha que você deseja hashear
    const senhaHasheada = await bcrypt.hash(senha, 10);
    console.log('Senha hasheada:', senhaHasheada); // Armazene esta senha no banco de dados
};

generateHashedPassword();
