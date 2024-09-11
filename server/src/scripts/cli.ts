import readline from 'readline';
import axios from 'axios';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para perguntar ao usuário
function pergunta(questao: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(questao, (resposta) => {
            resolve(resposta);
        });
    });
}

async function cadastrarUsuario() {
    try {
        // Pergunta ao usuário
        const nome = await pergunta('Digite o nome: ');
        const senha = await pergunta('Digite a senha: ');
        const email = await pergunta('Digite o email: ');
        const is_admin = (await pergunta('É administrador? (true/false): ')) === 'true';

        // Fecha a interface de leitura
        rl.close();

        // Envia a requisição para o servidor
        const resposta = await axios.post('http://localhost:3000/api/users', {
            nome,
            senha,
            email,
            is_admin
        });

        console.log('Resposta do servidor:', resposta.data);
    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);
    }
}

// Executa a função
cadastrarUsuario();
