import { formatCPF, formatCellphone, filterByName } from './utils.js';
import { pesquisacep } from './cep.js';

const cpfInput = document.getElementById('cpf'); //Verifica se o input está sendo capturado corretamente
const cellphoneInput = document.getElementById('telefone');
const cepInput = document.getElementById('cep');

// 'input' para avisar quando o usuário terminar de digitar
cpfInput.addEventListener('input', (event) => {
    const rawValue = event.target.value; //Extrai o valor digitado pelo usuário
    const formattedValue = formatCPF(rawValue); //Verifica a função formatCPF e formata o valor
    cpfInput.value = formattedValue;
}); 

cellphoneInput.addEventListener('input', (event) => {
    const typedValue = event.target.value;
    const formattedValue = formatCellphone(typedValue);
    cellphoneInput.value = formattedValue;
});

// O 'blur' é disparado assim que o usuário clica fora do campo de input (perde o foco).
// Quando isso acontece, ele pega o que está escrito (event.target.value) e manda para a função pesquisacep
cepInput.addEventListener('input', (event) => {
    const value = event.target.value;
    if(value.length === 8) {
        pesquisacep(value);
    }
});