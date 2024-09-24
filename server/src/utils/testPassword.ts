// Arquivo: testPassword.ts

import bcrypt from 'bcrypt';

const testPassword = async () => {
    const senhaDigitada = 'admin'; // O que o usuário digitou
    const senhaHasheada = '$2b$10$zi5gfQWAWkg.zodlgSa28.sS3ANJtFkQAmCqI6MUJ6/16De/ZPLu2'; // Exemplo de senha hasheada

    const isMatch = await bcrypt.compare(senhaDigitada, senhaHasheada);
    console.log('As senhas correspondem?', isMatch); // Deve retornar true se tudo estiver correto
};

testPassword();
