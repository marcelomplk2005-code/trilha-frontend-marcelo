import { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Pacientes } from './index'; 

// Dados falsos, mas coerentes
vi.mock('../../services/pacientes', () => ({
  getPacientes: vi.fn().mockResolvedValue([
    { id: '1', nome: 'Ana Beatriz Souza', cpf: '12345678901', status: 'Ativo' },
    { id: '2', nome: 'João Pedro Almeida', cpf: '10987654321', status: 'Inativo' }
  ]),
  deletePaciente: vi.fn()
}));

// Transforma o ciclo de vida do Ionic num useEffect para o Vitest conseguir ler
vi.mock('@ionic/react', async () => {
  const modInfo = await vi.importActual<typeof import('@ionic/react')>('@ionic/react');
  return {
    ...modInfo,
    useIonViewWillEnter: (callback: () => void) => {
      useEffect(() => {
        callback();
      }, [callback]); 
    }
  };
});

describe('Tela de Pacientes', () => {
  it('carrega e lista os pacientes vindos do service mockado', async () => {
    
    // Renderização dentro de um router falso para evitar quebra nos links
    render(
      <MemoryRouter>
        <Pacientes />
      </MemoryRouter>
    );

    // Aguarda a transição de estado e procura pelos nomes dos pacientes falsos
    await waitFor(() => {
      expect(screen.getByText('Ana Beatriz Souza')).toBeTruthy();
      expect(screen.getByText('João Pedro Almeida')).toBeTruthy();
    });
  });
});