// Arquivo: testPassword.ts

import bcrypt from 'bcrypt';

const testPassword = async () => {
    const senhaDigitada = 'admin'; // O que o usuário digitou
    const senhaHasheada = '$2b$10$98oQT/ZpwW35ewFr70VHAufrVJYKw1WhISmw02EiTRowBN3qWfQBi'; // Exemplo de senha hasheada
    const isMatch = await bcrypt.compare(senhaDigitada, senhaHasheada);
    console.log('As senhas correspondem?', isMatch); // Deve retornar true se tudo estiver correto
};

testPassword();
