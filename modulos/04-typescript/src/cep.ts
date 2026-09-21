import type { EnderecoViaCep } from "./types";

export const buscarCep = async (cep: string): Promise<EnderecoViaCep> => {
    // Checagem "falsy": Se a variável 'cep' estiver vazia, indefinida ou nula, interrompe e lança um erro.
    if (!cep) {
        throw new Error("CEP não informado.");
    }
    
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        throw new Error("O CEP deve conter 8 dígitos.");
    }


    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    // Para não confiar no que vem da internet antes de checar, tipa a resposta temporariamente como 'unknown'.
    const dados: unknown = await resposta.json();

    // Narrowing (Afunilamento de tipo): Verifica se 'dados' é um objeto válido, se não é nulo, e se a API não retornou um aviso de "erro" (ocorre quando se digita um CEP inexistente com 8 números).
    if (typeof dados !== "object" || dados === null || "erro" in dados) {
        throw new Error("CEP não encontrado na base de dados.");
    }

    // Casting: Após todas as barreiras de segurança acima passarem, garante ao TypeScript que 'dados' se encaixa perfeitamente na interface EnderecoViaCep
    return dados as EnderecoViaCep;
};