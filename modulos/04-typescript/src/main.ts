import { formatCPF, formatCellphone } from './utils';
import { buscarCep } from './cep';

//Capturando os elementos e tipando como campos de input (ou nulos, caso não encontre)
const cpfInput = document.getElementById('cpf') as HTMLInputElement | null;
const telefoneInput = document.getElementById('telefone') as HTMLInputElement | null;
const cepInput = document.getElementById('cep') as HTMLInputElement | null;

const ruaInput = document.getElementById('rua') as HTMLInputElement | null;
const bairroInput = document.getElementById('bairro') as HTMLInputElement | null;
const cidadeInput = document.getElementById('cidade') as HTMLInputElement | null;
const ufInput = document.getElementById('uf') as HTMLInputElement | null;

// Função utilitária para limpar os dados de endereço usando checagem truthy
const limpaFormularioCep = (): void => {
    if (ruaInput) ruaInput.value = "";
    if (bairroInput) bairroInput.value = "";
    if (cidadeInput) cidadeInput.value = "";
    if (ufInput) ufInput.value = "";
};

//Aplicando as máscaras com os eventos de input
if (cpfInput) {
    cpfInput.addEventListener('input', (event) => { //'escuta' cada vez que o usuário digita ou apaga algo ('input').
        const target = event.target as HTMLInputElement; //Garante que o alvo do evento (quem foi clicado/digitado) é um input.
        target.value = formatCPF(target.value);
    });
}

if (telefoneInput) {
    telefoneInput.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        target.value = formatCellphone(target.value);
    });
}

//Busca e preenchimento de CEP
if (cepInput) {
    cepInput.addEventListener('input', async (event) => {// Usa-se 'async' porque a busca do CEP leva tempo para ir e voltar da internet.
        const target = event.target as HTMLInputElement;
        const valorOriginal = target.value;
        const apenasNumeros = valorOriginal.replace(/\D/g, ""); 

        // Restaura a borda original (tirando a borda vermelha de erro, se houver) assim que o usuário volta a digitar.
        target.style.borderColor = "initial";

        if (apenasNumeros.length === 8) {
            try {
                const endereco = await buscarCep(apenasNumeros);

                // Preenche os inputs na tela
                if (ruaInput) ruaInput.value = endereco.logradouro;
                if (bairroInput) bairroInput.value = endereco.bairro;
                if (cidadeInput) cidadeInput.value = endereco.localidade;
                if (ufInput) ufInput.value = endereco.uf;

            } catch (erro) {
                // Se o buscarCep() lançar um erro (ex: CEP inexistente), o fluxo cai diretamente aqui.
                limpaFormularioCep();
                
                console.error("Falha ao buscar CEP:", erro);
                target.style.borderColor = "red"; // Feedback visual 
            }
        } else {
            // Se houver menos ou mais de 8 números, limpa os campos para não deixar dados de um CEP anterior presos na tela.
            limpaFormularioCep();
        }
    });
}