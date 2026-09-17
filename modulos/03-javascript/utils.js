// Funçao para formatar o CPF
export const formatCPF = (text) => {
    if (!text) return text;

    const digitsOnly = text.replace(/\D/g, "");
    if (digitsOnly.length === 11) {
        return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}-${digitsOnly.slice(9, 11)}`;
    }
    return text;
};

// Funçao para formatar o Celular
export const formatCellphone = (text) => {
    const digitsOnly = text.replace(/\D/g, "");
    if (digitsOnly.length === 11) {
        return `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
    }
    return text;
};

//Filtro por nome (pacientes, termo)
export const filterByName = (pacientes, term) => {
    const cleanTerm = term.trim(); //Remove espaços em branco no início e no final do termo

    if (cleanTerm === "") {
        return pacientes; 
    }

    const normalizeText = (text) => { // Função para normalizar o texto
        return text
            .normalize("NFD") // Normaliza o texto para decompor caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
            .toLowerCase(); // Converte para minúsculas
    };

    const normalizedTerm = normalizeText(cleanTerm);

    return pacientes.filter((patient) => { // Filtra os pacientes com base no termo normalizado
        const normalizedName = normalizeText(patient.nome);
        return normalizedName.includes(normalizedTerm); // includes() retorna true se o nome normalizado do paciente contiver o termo normalizado
    });
}
