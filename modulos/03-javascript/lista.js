import { pacientes as patientsList } from './pacientes.js';
import { filterByName, formatCPF } from './utils.js';

const searchInput = document.getElementById('busca-paciente');
const patientsContainer = document.getElementById('container-pacientes');

const renderPatients = (patients) => {
    patientsContainer.innerHTML = ''; // Limpa o conteúdo a cada letra digitada

    // Se a busca não encontrar nada
    if (patients.length === 0) {
        patientsContainer.innerHTML = "<p>Nenhum paciente encontrado.</p>";
        return;
    }


    patients.forEach((patient) => {
        const isInactiveClass = patient.status === "Inativo" ? "card-do-paciente--inativo" : ""; //Condição para adicionar a classe de paciente inativo ao card do paciente
        const displayCpf = formatCPF(patient.cpf); //Pega o CPF formatado para exibir no card do paciente


        const cardHTML = `
            <article class="card-do-paciente ${isInactiveClass}">
                <h2 class="card-do-paciente__nome">${patient.nome}</h2>
                <p class="card-do-paciente__cidade-uf">${patient.cidade},${patient.uf}</p>
                <p class="card-do-paciente__nascimento">${patient.dataNascimento}</p>
                <span class="card-do-paciente__cpf">CPF: ${displayCpf}</span>
                <span class="card-do-paciente__status">Status: ${patient.status}</span>
            </article>
        `;

        patientsContainer.innerHTML += cardHTML; //Adiona um card até formar a lista completa de pacientes encontrados na busca
    });
};

renderPatients(patientsList); // Renderiza a lista completa de pacientes ao carregar a página

searchInput.addEventListener('input', (event) => {
    const typedTerm = event.target.value;
    const filteredList = filterByName(patientsList, typedTerm); // Filtra a lista de pacientes com base no termo digitado

    renderPatients(filteredList); //Mostra a lista filtrada de pacientes na tela
});