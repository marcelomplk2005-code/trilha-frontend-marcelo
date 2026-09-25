import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHistory, useParams } from 'react-router-dom';
import { pacienteSchema, type PacienteFormData } from '../../schemas/pacienteSchema';
import { createPaciente, updatePaciente, getPacienteById } from '../../services/pacientes';
import { useToastStore } from '../../store/toast';


export const PacienteForm = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const showToast = useToastStore((state) => state.showToast);

  // Inicializa o React Hook Form com o Zod
  const { 
    register, 
    handleSubmit, 
    setValue, // Usado para injetar os dados do ViaCEP
    reset,    // Usado para preencher o formulário na edição
    formState: { errors, isSubmitting } 
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      status: 'Ativo'
    }
  });

  // Carregamento dos dados a partir da edição
  useEffect(() => {
    if (id && id !== 'novo') {
      const carregarPaciente = async () => {
        try {
          const dados = await getPacienteById(id);
          reset(dados); // O reset preenche automaticamente todos os inputs que dão "match" com o objeto
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
          showToast('Erro ao carregar paciente.', 'error');
        }
      };
      carregarPaciente();
    }
  }, [id, reset, showToast]);

  // Busca de CEP
  const handleBuscaCep = async (evento: React.FocusEvent<HTMLInputElement>) => {
    const cepBuscado = evento.target.value.replace(/\D/g, '');
    
    if (cepBuscado.length !== 8) return;

    // Feedback visual temporário
    setValue('rua', 'Buscando...');
    setValue('bairro', 'Buscando...');
    setValue('cidade', 'Buscando...');
    setValue('uf', '...');

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepBuscado}/json/`);
      const conteudo = await resposta.json();

      if (!("erro" in conteudo)) {
        setValue('rua', conteudo.logradouro);
        setValue('bairro', conteudo.bairro);
        setValue('cidade', conteudo.localidade);
        setValue('uf', conteudo.uf);
      } else {
        showToast('CEP não encontrado.', 'error');
        setValue('rua', '');
        setValue('bairro', '');
        setValue('cidade', '');
        setValue('uf', '');
      }
    } catch (erro) {
      console.error(erro);
      showToast('Erro ao buscar o CEP.', 'error');
    }
  };

  // Salva os Dados
  const onSubmit = async (data: PacienteFormData) => {
    try {
      if (id && id !== 'novo') {
        await updatePaciente(id, data);
        showToast('Paciente atualizado com sucesso!', 'success');
      } else {
        await createPaciente(data);
        showToast('Paciente cadastrado com sucesso!', 'success');
      }
      history.push('/pacientes');
    } catch (error) {
      console.error('Erro ao salvar o paciente:', error);
      showToast('Erro ao salvar. Verifique os dados.', 'error');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{id && id !== 'novo' ? 'Editar Paciente' : 'Novo Paciente'}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        
        {/* NOME */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Nome Completo</label>
          <input {...register('nome')} placeholder="Ex: Fulano de Ciclano" style={{ padding: '10px' }} />
          {errors.nome && <span style={{ color: 'red', fontSize: '14px' }}>{errors.nome.message}</span>}
        </div>

        {/* CPF */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>CPF</label>
          <input {...register('cpf')} placeholder="Apenas números" maxLength={14} style={{ padding: '10px' }} />
          {errors.cpf && <span style={{ color: 'red', fontSize: '14px' }}>{errors.cpf.message}</span>}
        </div>

        {/* DATA DE NASCIMENTO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Data de Nascimento</label>
          <input type="date" {...register('dataNascimento')} style={{ padding: '10px' }} />
          {errors.dataNascimento && <span style={{ color: 'red', fontSize: '14px' }}>{errors.dataNascimento.message}</span>}
        </div>

        {/* CELULAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Celular</label>
          <input {...register('celular')} placeholder="Ex.: (11) 98989-0101" maxLength={15} style={{ padding: '10px' }} />
          {errors.celular && <span style={{ color: 'red', fontSize: '14px' }}>{errors.celular.message}</span>}
        </div>

        {/* E-MAIL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>E-mail</label>
          <input type="email" {...register('email')} placeholder="email@exemplo.com" style={{ padding: '10px' }} />
          {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email.message}</span>}
        </div>

        {/* SEXO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Sexo</label>
          <select {...register('sexo')} style={{ padding: '10px' }}>
            <option value="">Selecione...</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        {/* STATUS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Status</label>
          <select {...register('status')} style={{ padding: '10px' }}>
            <option style={{backgroundColor: '#90EE90', color: 'white'}}value="Ativo">Ativo</option>
            <option style={{backgroundColor: '#FA8072', color: 'white'}}value="Inativo">Inativo</option>
          </select>
        </div>

        <h3 style={{ gridColumn: 'span 2', marginTop: '10px', marginBottom: '0' }}>Endereço</h3>

        {/* CEP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>CEP</label>
          <input 
            {...register('cep')} 
            onBlur={handleBuscaCep} 
            placeholder="00000-000" 
            maxLength={9} 
            style={{ padding: '10px' }} 
          />
        </div>

        {/* RUA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Rua</label>
          <input {...register('rua')} style={{ padding: '10px' }} />
        </div>

        {/* BAIRRO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Bairro</label>
          <input {...register('bairro')} style={{ padding: '10px' }} />
        </div>

        {/* CIDADE E UF */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label>Cidade</label>
            <input {...register('cidade')} style={{ padding: '10px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label>UF</label>
            <input {...register('uf')} maxLength={2} style={{ padding: '10px' }} />
          </div>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button 
            type="submit" 
            disabled={isSubmitting} // Desabilita enquanto salva
            style={{ flex: 1, padding: '15px', backgroundColor: isSubmitting ? '#a5d8b2' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Paciente'}
          </button>
          
          <button 
            type="button" 
            onClick={() => history.push('/pacientes')} 
            style={{ flex: 1, padding: '15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};