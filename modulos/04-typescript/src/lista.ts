import type { Paciente } from './types';
import { pacientes } from './pacientes';
import { filterByName, formatCPF } from './utils';

const containerPacientes = document.getElementById('container-pacientes') as HTMLElement | null;
const inputBusca = document.getElementById('busca-paciente') as HTMLInputElement | null; //Avisa ao TypeScript que o elemento é um input e retorna vazio caso não exista

const renderizarPacientes = (lista: Paciente[]): void => {
    // Checagem truthy
    if (!containerPacientes) return;

    // Limpa o HTML do container antes de desenhar a nova lista
    containerPacientes.innerHTML = '';

    // Feedback se a busca não encontrar nada
    if (lista.length === 0) {
        containerPacientes.innerHTML = '<p>Nenhum paciente encontrado com esse nome.</p>';
        return;
    }

    // Percorre cada paciente para construir os cards
    lista.forEach((paciente) => {
        // Cria o container principal do card
        const card = document.createElement('div');
        
        // Define a classe do card com base no status do paciente
        if (paciente.status === 'Inativo') {
            card.className = 'card-do-paciente card-do-paciente--inativo';
        } else {
            card.className = 'card-do-paciente';
        }

        // substituindo as variáveis pelos dados tipados do objeto 'paciente' e aplicando a formatação na visualização do CPF
        card.innerHTML = `
            <h2 class="card-do-paciente__nome">${paciente.nome}</h2>
            <p class="card-do-paciente__cidade-uf">${paciente.cidade} / ${paciente.uf}</p>
            <p class="card-do-paciente__cpf">CPF: ${formatCPF(paciente.cpf)}</p>
            <p class="card-do-paciente__nascimento">Data de Nasc.: ${paciente.dataNascimento}</p>
            <p class="card-do-paciente__status">${paciente.status}</p>
        `;

        // Insere o card montado dentro da <section>
        containerPacientes.appendChild(card);
    });
};

// Checagem truthy para garantir que o input de busca existe antes de atrelar o ouvinte de eventos.
if (inputBusca) {
    inputBusca.addEventListener('input', (event) => {
        // Dispara a função toda vez que o usuário digita ou apaga alguma tecla no campo.
        const target = event.target as HTMLInputElement;
        const termoDigitado = target.value;

        const listaFiltrada = filterByName(pacientes, termoDigitado);
        renderizarPacientes(listaFiltrada);
    });
}

// Assim que a tela carrega, desenha todos os pacientes
renderizarPacientes(pacientes);