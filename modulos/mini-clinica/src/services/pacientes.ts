import { api } from './api.ts';
import type { Paciente } from '../types/types.ts';

// Função para entregar a tela exclusivamente dos pacientes
export const getPacientes = async () => (await api.get<Paciente[]>('/pacientes')).data;

//Função para receber os dados de um novo paciente
export const createPaciente = async (paciente: Omit<Paciente, 'id'>) => (await api.post<Paciente>('/pacientes', paciente)).data;

//Função que precisa de duas informações para trabalhar: o id (para montar a URL correta e apontar qual paciente será editado)
//Dispara um PATCH, que é uma atualização parcial: o servidor altera apenas os campos que você enviou e mantém o resto intacto.
export const updatePaciente = async (id: string, paciente: Partial<Paciente>) => (await api.patch<Paciente>(`/pacientes/${id}`, paciente)).data;

//Função que recebe apenas a variável id e dispara o método 'DELETE'
export const deletePaciente = async (id: string) => await api.delete(`/pacientes/${id}`);

// Buscar um único paciente pelo ID
export const getPacienteById = async (id: string) => (await api.get<Paciente>(`/pacientes/${id}`)).data;

