import { usePacientes } from '../../hooks/usePacientes';
import { useAuthStore } from '../../store/auth';
import { formatCPF } from '../../utils';
// Import do useHistory para poder trocar de telas ao clicar nos botões
import { useHistory } from 'react-router-dom';
import { deletePaciente } from '../../services/pacientes';
import { useToastStore } from '../../store/toast';

export const Pacientes = () => {
  // Puxa a função de logout da memória global (Zustand)
  const logout = useAuthStore((state) => state.logout);
  
  // Puxa os dados e os status do hook customizado (usePacientes.ts)
  const { pacientes, loading, error } = usePacientes();

  // Chama a função para usá-la nos botões de Novo e Editar
  const history = useHistory();

  // Puxa a função showToast da memória global
  const showToast = useToastStore((state) => state.showToast);
  // Função que vai disparar ao clicar em Excluir
  const handleExcluir = async (id: string) => {
    const confirmar = window.confirm('Tem a certeza que deseja excluir este paciente?');
    if (!confirmar) return;

    try {
      // Vai à API e apaga
      await deletePaciente(id);
      
      // Dispara o nosso Toast de sucesso (o balão verde vai aparecer!)
      showToast('Paciente excluído com sucesso!', 'success');
      
      // Recarrega a página após 1.5 segundos para a lista atualizar (tempo suficiente para ler o Toast)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      console.error('Erro ao excluir paciente:', err);
      // Se a API falhar, mostra o balão vermelho
      showToast('Erro ao excluir o paciente.', 'error');
    }
  };

  // Feedback visual enquanto a API não responde
  if (loading) return <p style={{ padding: '20px' }}>Carregando pacientes...</p>;
  if (error) return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '20px' }}>
        <h1 style={{ margin: 0 }}>Lista de Pacientes</h1>
        
        {/* Agrupamento dos botões em uma div flex para ficarem lado a lado */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => history.push('/pacientes/novo')} 
            style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            + Novo Paciente
          </button>
          
          <button onClick={logout} className="btn-default" style={{ backgroundColor: '#dc3545', color: '#fff' , padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Sair do Sistema
          </button>
        </div>
      </header>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>CPF</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* O map percorre o array e "desenha" uma linha (tr) inteira para cada paciente */}
          {pacientes.map((paciente) => (
            <tr key={paciente.id} style={{ opacity: paciente.status === 'Inativo' ? 0.5 : 1 }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{paciente.nome}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatCPF(paciente.cpf)}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  backgroundColor: paciente.status === 'Ativo' ? '#d4edda' : '#f8d7da',
                  color: paciente.status === 'Ativo' ? '#155724' : '#721c24'
                }}>
                  {paciente.status}
                </span>
              </td>
              
              {/* Célula (td) que redireciona para a rota com o ID dinâmico do paciente */}
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <button 
                  onClick={() => history.push(`/pacientes/${paciente.id}`)}
                  style={{ color: '#000', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  ✏️Editar
                </button>

                <button 
                  onClick={() => handleExcluir(paciente.id)}
                  style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px', }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};