import { z } from 'zod';

export const pacienteSchema = z.object({
  // NOME: Não pode ser vazio
  nome: z.string().min(1, "Informe o nome"),

  // CPF: Não pode ser vazio, e checa se tem 11 dígitos removendo a máscara no refine
  cpf: z.string()
    .min(1, "Informe o CPF")
    .refine((val) => {
      const apenasNumeros = val.replace(/\D/g, '');
      return apenasNumeros.length === 11;
    }, "CPF deve ter 11 dígitos"),

  // DATA DE NASCIMENTO: Não pode ser vazia e não pode ser no futuro
  dataNascimento: z.string()
    .min(1, "Informe a data de nascimento")
    .refine((val) => {
      const dataInserida = new Date(val);
      const dataAtual = new Date();
      return dataInserida <= dataAtual;
    }, "Data de nascimento não pode ser futura"),

  // CELULAR: Checa se tem 11 dígitos
  celular: z.string()
    .min(1, "Informe o celular")
    .refine((val) => {
      const apenasNumeros = val.replace(/\D/g, '');
      return apenasNumeros.length === 11;
    }, "Celular inválido"),

  // E-MAIL: Zod já tem validação nativa para e-mail
  email: z.string()
    .min(1, "Informe o e-mail")
    .email("E-mail inválido"),

  // Sem regras estritas nos casos de validação, mas necessários para o objeto
  sexo: z.string().optional(),
  status: z.enum(['Ativo', 'Inativo']),
  cep: z.string().optional(),
  rua: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional()
});

// Extrai a tipagem do schema para usarmos no React Hook Form sem duplicar código
export type PacienteFormData = z.infer<typeof pacienteSchema>;