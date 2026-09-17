import { formatCPF, formatCellphone, filterByName } from './utils.js';

const cpfInput = document.getElementById('cpf'); //Verifica se o input está sendo capturado corretamente
const cellphoneInput = document.getElementById('telefone');

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


