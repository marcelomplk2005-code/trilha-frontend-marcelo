import { useState } from 'react';
import { usePacientes } from '../../hooks/usePacientes';
import { formatCPF } from '../../utils';
import { useHistory } from 'react-router-dom';
import { deletePaciente } from '../../services/pacientes';
import { useToastStore } from '../../store/toast';

// Importações vitais do Ionic para estruturar a página e o Modal
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonMenuButton, IonButton, IonIcon, IonModal 
} from '@ionic/react';
// Ícones do Ionic (ionicons)
import { addOutline, createOutline, trashOutline, warningOutline } from 'ionicons/icons'; 

export const Pacientes = () => {
  const { pacientes, } = usePacientes();
  const history = useHistory();
  const showToast = useToastStore((state) => state.showToast);

  // Em vez de window.confirm, controla a abertura de uma janela na tela
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteParaExcluir, setPacienteParaExcluir] = useState<string | null>(null);

  // Base para quando clicar na lixeira
  const abrirConfirmacao = (id: string) => {
    setPacienteParaExcluir(id);
    setModalAberto(true);
  };

  // Função que realmente vai à API quando o utilizador clica em "Sim"
  const confirmarExclusao = async () => {
    if (!pacienteParaExcluir) return;

    try {
      await deletePaciente(pacienteParaExcluir);
      showToast('Paciente excluído com sucesso!', 'success');
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      console.error('Erro ao excluir paciente:', err);
      showToast('Erro ao excluir o paciente.', 'error');
    } finally {
      // Independentemente de dar certo ou errado, fecha o modal no final
      setModalAberto(false);
      setPacienteParaExcluir(null);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          
          <IonTitle className="ion-padding-start">Lista de Pacientes</IonTitle>
          
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/pacientes/novo')} fill="solid" color="light" style={{ marginRight: '10px' }}>
              <IonIcon slot="start" icon={addOutline} />
              Novo Paciente
            </IonButton>
          </IonButtons>
          
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
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
            {pacientes.map((paciente) => (
              <tr key={paciente.id} style={{ opacity: paciente.status === 'Inativo' ? 0.5 : 1 }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{paciente.nome}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatCPF(paciente.cpf)}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '12px', 
                    backgroundColor: paciente.status === 'Ativo' ? '#d4edda' : '#f8d7da',
                    color: paciente.status === 'Ativo' ? '#155724' : '#721c24'
                  }}>
                    {paciente.status}
                  </span>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  
                  <IonButton 
                    fill="clear" 
                    color="dark" 
                    onClick={() => history.push(`/pacientes/${paciente.id}`)}
                  >
                    <IonIcon icon={createOutline} />
                  </IonButton>

                  <IonButton 
                    fill="clear" 
                    color="danger" 
                    onClick={() => abrirConfirmacao(paciente.id)} 
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal de confirmação (Fica invisível até modalAberto ser true) */}
        <IonModal 
          isOpen={modalAberto} 
          onDidDismiss={() => setModalAberto(false)}
          initialBreakpoint={0.5} // No celular, o modal sobe ocupando apenas 50% da tela inferior
          breakpoints={[0, 0.5]}
        >
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <IonIcon icon={warningOutline} style={{ fontSize: '64px', color: 'var(--ion-color-warning)' }} />
            <h2>Confirmar Exclusão</h2>
            <p>Tem a certeza que deseja excluir este paciente?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
              <IonButton color="medium" onClick={() => setModalAberto(false)}>
                Cancelar
              </IonButton>
              <IonButton color="danger" onClick={confirmarExclusao}>
                Sim, Excluir
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};