// describe: Serve para agrupar e organizar os testes numa "pasta".
// it: É o teste em si (lê-se "o código deve fazer isto").
// expect: É a afirmação (lê-se "eu espero que o resultado seja X").
import { describe, it, expect } from 'vitest';
import { formatCPF, validateCellphone, filterByName } from './../utils'; 
import type { Paciente } from '../types/types';


// Grupo principal de testes
describe('Utilitários', () => {

  describe('formatCPF', () => {
    // it.each para passar uma tabela de cenários.
    // Cada linha é um array: [entrada (texto original), esperado (texto formatado)]
    it.each([
      ['12345678901', '123.456.789-01'], // Cenário ideal (11 números crus)
      ['123.456.789-01', '123.456.789-01'], // Cenário onde o utilizador já pôs máscara
      ['1234567890', '1234567890'], // Cenário incompleto (10 números, não deve formatar)
      ['', ''], // Cenário de campo vazio
      ['abc', 'abc'] // Cenário absurdo (letras, não deve formatar)
    ])(
      // O nome do teste usa %s para injetar os valores da tabela no console
      'para a entrada "%s" deve retornar "%s"', 
      (entrada, esperado) => {
        const resultado = formatCPF(entrada);
        // Resultado tem de ser exatamente igual (toBe) ao 'esperado'
        expect(resultado).toBe(esperado);
    });
  });

  describe('validateCellphone', () => {
    // Tabela: [entrada (texto digitado), esperado (se é verdadeiro ou falso)]
    it.each([
      ['11987654321', true], // Celular perfeito
      ['(11) 98765-4321', true], // Celular perfeito, mas com máscara (a função deve limpar)
      ['1187654321', false], // Errado: Falta o número '9' depois do DDD
      ['11887654321', false], // Errado: O dígito depois do DDD é '8' em vez de '9'
      ['119876543210', false], // Errado: Tem um número a mais (12 dígitos)
      ['', false] // Errado: Vazio
    ])(
      'para a entrada "%s" deve retornar %s', 
      (entrada, esperado) => {
        const resultado = validateCellphone(entrada);
        expect(resultado).toBe(esperado); // Verifica se devolve true ou false
    });
  });

  describe('filterByName', () => {
    // Mock (banco de dados falso de teste). 
    const listaFalsa = [
      { id: '1', nome: 'Ana Beatriz Souza', cpf: '', dataNascimento: '', celular: '', email: '', status: 'Ativo' },
      { id: '2', nome: 'Mariana Costa Lima', cpf: '', dataNascimento: '', celular: '', email: '', status: 'Ativo' },
      { id: '3', nome: 'Luana Ferreira', cpf: '', dataNascimento: '', celular: '', email: '', status: 'Ativo' },
      { id: '4', nome: 'Juliana Rocha', cpf: '', dataNascimento: '', celular: '', email: '', status: 'Ativo' },
      { id: '5', nome: "Joana D'Arc Nascimento", cpf: '', dataNascimento: '', celular: '', email: '', status: 'Ativo' },
      { id: '6', nome: 'João Pedro Almeida', cpf: '', dataNascimento: '', celular: '', email: '', status: 'Ativo' }
    ];

    // Tabela: [termo Pesquisado, quantidade De Pacientes Que Devem Ser Encontrados]
    it.each([
      ['ana', 5], // A palavra 'ana' está dentro de Ana, Mariana, Luana, Juliana e Joana. Devem voltar 5.
      ['JOÃO', 1], // Testa se a função ignora o fato de pesquisar em maiúsculas (deve achar 1)
      ['joao', 1],// Testa se a função ignora acentos (NFD). Procura "joao", acha "João".
      ['Rocha', 1],
      ['xyz', 0], // Pesquisa sem sentido, não deve achar ninguém (0)
      ['', 6], // Pesquisa vazia, deve devolver a lista inteira (6)
      ['   ', 6] // Pesquisa só com espaços (o trim() deve limpar e devolver a lista inteira)
    ])(
      // %i é usado porque a 'quantidade Esperada' é um número (integer)
      'para o termo "%s" deve encontrar %i paciente(s)', 
      (termo, quantidadeEsperada) => {
        const resultado = filterByName(listaFalsa as Paciente[], termo as string);
        
        // Afirma que o tamanho da lista que retornou (.length) é igual à quantidade esperada
        expect(resultado.length).toBe(quantidadeEsperada);
    });
  });

});