import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHistory, useParams } from 'react-router-dom';
import { pacienteSchema, type PacienteFormData } from '../../schemas/pacienteSchema';
import { createPaciente, updatePaciente, getPacienteById } from '../../services/pacientes';

export const PacienteForm = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
  });

  useEffect(() => {
    if (id && id !== 'novo') {
      const carregarPaciente = async () => {
        try {
          const dados = await getPacienteById(id);
          setValue('nome', dados.nome);
          setValue('cpf', dados.cpf);
          setValue('status', dados.status);
        } catch (error) {
          console.error('Erro ao carregar os dados do paciente para edição:', error);
        }
      };
      carregarPaciente();
    }
  }, [id, setValue]);

  const onSubmit = async (data: PacienteFormData) => {
    try {
      if (id && id !== 'novo') {
        await updatePaciente(id, data);
      } else {
        await createPaciente(data);
      }
      history.push('/pacientes');
    } catch (error) {
      console.error('Erro ao salvar o paciente:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{id && id !== 'novo' ? 'Editar Paciente' : 'Novo Paciente'}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Nome Completo</label>
          <input {...register('nome')} placeholder="Ex: Ana Beatriz" style={{ padding: '10px' }} />
          {errors.nome && <span style={{ color: 'red', fontSize: '14px' }}>{errors.nome.message}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>CPF (Apenas números)</label>
          <input {...register('cpf')} placeholder="Ex: 12345678901" maxLength={11} style={{ padding: '10px' }} />
          {errors.cpf && <span style={{ color: 'red', fontSize: '14px' }}>{errors.cpf.message}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Status</label>
          <select {...register('status')} style={{ padding: '10px' }}>
            <option value="">Selecione...</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          {errors.status && <span style={{ color: 'red', fontSize: '14px' }}>{errors.status.message}</span>}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" className="btn-default" style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Salvar
          </button>
          <button type="button" onClick={() => history.push('/pacientes')} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};