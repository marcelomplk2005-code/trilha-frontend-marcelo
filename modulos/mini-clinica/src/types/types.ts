// src/types.ts

export type StatusPaciente = "Ativo" | "Inativo";
export type SexoPaciente = "Feminino" | "Masculino";

export interface Paciente {
  id: string; 
  nome: string;
  cpf: string;
  dataNascimento?: string; 
  celular?: string; 
  email?: string;
  sexo?: SexoPaciente;
  status: StatusPaciente;
  cep?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia?: string;
  ddd: string;
  siafi: string;
}