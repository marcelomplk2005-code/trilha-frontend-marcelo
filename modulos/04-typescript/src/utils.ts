import type { Paciente } from './types';

export const formatCPF = (text: string): string => {
    // Checagem truthy: Se o texto for vazio, retorna o próprio vazio e para a função.
    if (!text) return text;

    const digitsOnly = text.replace(/\D/g, "");
    if (digitsOnly.length === 11) {
        return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}-${digitsOnly.slice(9, 11)}`;
    }
    // Enquanto tiver menos de 11 números, devolve apenas o que o usuário digitou sem a máscara completa.
    return text;
};

export const formatCellphone = (text: string): string => {
    if (!text) return text;

    const digitsOnly = text.replace(/\D/g, "");

    if (digitsOnly.length === 11) {
        return `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
    }
    return text;
};

export const filterByName = (pacientes: Paciente[], term: string): Paciente[] => {
    const cleanTerm = term.trim(); // .trim() corta os espaços em branco acidentais no começo e no fim da digitação.
    if (!cleanTerm) {// Se, após limpar os espaços, não sobrar nenhuma letra, devolvemos a lista inteira intacta.
        return pacientes;
    }

    const normalizeText = (text: string): string => {
        return text
            .normalize("NFD") // Separa os acentos das letras
            .replace(/[\u0300-\u036f]/g, "") // Apaga os acentos
            .toLowerCase(); // Converte tudo para minúsculas
    };

    const normalizedTerm = normalizeText(cleanTerm);
    // O .filter percorre todo o banco de dados.
    return pacientes.filter((patient) => {
        const normalizedName = normalizeText(patient.nome);
        // Se o nome do paciente da base contiver o termo que o usuário escreveu, inclui ele na lista de resultados.
        return normalizedName.includes(normalizedTerm);
    });
};