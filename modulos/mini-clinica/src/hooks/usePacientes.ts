import { useState, useCallback } from 'react';
import { getPacientes } from '../services/pacientes';
import type { Paciente } from '../types/types';

export const usePacientes = () => {
  // As memórias internas desta operação
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Vai até a API (através do serviço Axios) e traz os dados
  const fetchPacientes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPacientes(); 
      setPacientes(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar a lista de pacientes.');
    } finally {
      setLoading(false); // Independentemente de dar erro ou sucesso, o "carregando" deve terminar
    }
  }, []); // O useCallback garante a estabilidade da função para o refetch

  // Entrega para a tela visual apenas as informações 'mastigadas'
  return { pacientes, loading, error, refetch: fetchPacientes };
};