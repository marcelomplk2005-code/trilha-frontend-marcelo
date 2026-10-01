import { describe, it, expect } from 'vitest';
import { pacienteSchema } from './pacienteSchema'; 

describe('Validação do pacienteSchema', () => { 
  // Em cada teste a ideia é pegar este paciente e "estragar" apenas um campo para ver se o Zod reage bem.
  const pacienteValido = {
    nome: 'Ana Beatriz Souza',
    cpf: '12345678901',
    dataNascimento: '1990-04-12',
    celular: '(11) 98765-4321',
    email: 'ana.souza@example.com',
    status: 'Ativo'
  };

  describe('Casos de Falha (Verificando as mensagens de erro)', () => {
    it.each([
      ['nome', '', 'Informe o nome'],
      ['cpf', '', 'Informe o CPF'],
      ['cpf', '123', 'CPF deve ter 11 dígitos'],
      ['dataNascimento', '', 'Informe a data de nascimento'],
      ['dataNascimento', '2999-01-01', 'Data de nascimento não pode ser futura'],
      ['celular', '', 'Informe o celular'],
      ['celular', '1187654321', 'Celular inválido'], // Falta o 9
      ['celular', '11887654321', 'Celular inválido'], // O dígito é 8 em vez de 9
      ['email', '', 'Informe o e-mail'],
      ['email', 'ana@', 'E-mail inválido']
    ])(
      'No campo "%s", ao digitar "%s", deve retornar o erro: "%s"', 
      (campo, valor, erroEsperado) => {
        
        // (...) para copiar o paciente válido e sobrescrever APENAS o campo do teste
        const dadosTestados = { ...pacienteValido, [campo]: valor };
        
        // Passa os dados manipulados pelo Zod de forma segura
        const resultado = pacienteSchema.safeParse(dadosTestados);
        
        // Garante que o resultado deu "false" (ou seja, o Zod bloqueou a entrada)
        expect(resultado.success).toBe(false);
        
        if (!resultado.success) {
          // Procuramos dentro da lista de erros do Zod aquele que pertence ao campo que é testado.
          const erroDoCampo = resultado.error.issues.find(issue => issue.path.includes(campo));
          expect(erroDoCampo?.message).toBe(erroEsperado);
        }
    });
  });

  describe('Casos de Sucesso (Valores aceites sem gerar erro)', () => {
    // Tabela com as linhas onde a "Mensagem esperada" era "(nenhuma)"
    it.each([
      ['nome', 'Ana Beatriz Souza'],
      ['cpf', '12345678901'],
      ['cpf', '123.456.789-01'], // Zod deve aceitar com ou sem máscara
      ['dataNascimento', '1990-04-12'],
      ['celular', '(11) 98765-4321'],
      ['email', 'ana.souza@example.com']
    ])(
      'No campo "%s", ao digitar "%s", o Zod deve aceitar normalmente', 
      (campo, valor) => {
        const dadosTestados = { ...pacienteValido, [campo]: valor };
        const resultado = pacienteSchema.safeParse(dadosTestados);
        
        // Se o valor é válido, o Zod devolve true.
        expect(resultado.success).toBe(true);
    });
  });

});