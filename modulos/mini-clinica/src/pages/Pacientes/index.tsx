import { useState } from 'react';
import { usePacientes } from '../../hooks/usePacientes';
import { formatCPF } from '../../utils';
import { useHistory } from 'react-router-dom';
import { deletePaciente } from '../../services/pacientes';
import { useToastStore } from '../../store/toast';
import { useIonViewWillEnter } from '@ionic/react';

// Importações vitais do Ionic para estruturar a página e o Modal
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonMenuButton, IonButton, IonIcon, IonModal,
  IonGrid, IonRow, IonCol, IonText 
} from '@ionic/react';
// Ícones do Ionic (ionicons)
import { addOutline, createOutline, trashOutline, warningOutline } from 'ionicons/icons'; 

export const Pacientes = () => {
  const { pacientes, loading, error, refetch} = usePacientes();
  useIonViewWillEnter(() => {
    refetch();
  });
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
      
      refetch();
      
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
        
        {loading ? (
          <IonText color="medium"><p className="ion-padding">Carregando pacientes...</p></IonText>
        ) : error ? (
          <IonText color="danger"><p className="ion-padding">{error}</p></IonText>
        ) : (
          // MUDANÇA: Tabela HTML removida. Utilização do IonGrid para simular colunas responsivas
          <IonGrid className="ion-margin-top">
            <IonRow style={{ backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
              <IonCol className="ion-padding">Nome</IonCol>
              <IonCol className="ion-padding">CPF</IonCol>
              <IonCol className="ion-padding">Status</IonCol>
              <IonCol className="ion-padding">Ações</IonCol>
            </IonRow>

            {pacientes.map((paciente) => (
              <IonRow 
                key={paciente.id} 
                className="ion-align-items-center"
                style={{ borderBottom: '1px solid #ddd', opacity: paciente.status === 'Inativo' ? 0.5 : 1 }}
              >
                <IonCol className="ion-padding">
                  <IonText>{paciente.nome}</IonText>
                </IonCol>
                
                <IonCol className="ion-padding">
                  <IonText>{formatCPF(paciente.cpf)}</IonText>
                </IonCol>
                
                <IonCol className="ion-padding">
                  <IonText 
                    color={paciente.status === 'Ativo' ? 'success' : 'danger'}
                    style={{ 
                      backgroundColor: paciente.status === 'Ativo' ? '#d4edda' : '#f8d7da',
                      padding: '4px 8px', borderRadius: '12px'
                    }}
                  >
                    <small>{paciente.status}</small>
                  </IonText>
                </IonCol>
                
                <IonCol className="ion-padding">
                  <IonButton fill="clear" color="dark" onClick={() => history.push(`/pacientes/${paciente.id}`)}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  <IonButton fill="clear" color="danger" onClick={() => abrirConfirmacao(paciente.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        )}

        {/* Modal de confirmação (Fica invisível até modalAberto ser true) */}
        <IonModal 
          isOpen={modalAberto} 
          onDidDismiss={() => setModalAberto(false)}
          initialBreakpoint={0.5} // No celular, o modal sobe ocupando apenas 50% da tela inferior
          breakpoints={[0, 0.5]}
        >
          <IonContent className="ion-padding ion-text-center">
            <IonIcon icon={warningOutline} color="warning" style={{ fontSize: '64px', marginTop: '20px' }} />
            <IonText color="dark">
              <h2>Confirmar Exclusão</h2>
            </IonText>
            <IonText color="medium">
              <p>Tem a certeza que deseja excluir este paciente?</p>
            </IonText>
            
            <IonGrid className="ion-margin-top">
              <IonRow className="ion-justify-content-center">
                <IonCol size="auto">
                  <IonButton color="medium" onClick={() => setModalAberto(false)}>Cancelar</IonButton>
                </IonCol>
                <IonCol size="auto">
                  <IonButton color="danger" onClick={confirmarExclusao}>Sim, Excluir</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};