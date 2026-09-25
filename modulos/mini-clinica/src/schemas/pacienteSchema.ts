import { z } from 'zod';

export const pacienteSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.')
    .max(100, 'O nome está muito longo.'),
  
  cpf: z.string()
    .length(11, 'O CPF deve ter exatamente 11 números.')
    .regex(/^\d+$/, 'O CPF deve conter apenas números.'),

  status: z.enum(['Ativo', 'Inativo'] as const, {
    message: 'Selecione um status válido (Ativo ou Inativo).' 
  })
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;