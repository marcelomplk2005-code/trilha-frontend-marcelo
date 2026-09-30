import { IonToast } from '@ionic/react';
import { useToastStore } from '../../store/toast';

export const Toast = () => {
  // Leitura do estado global gerenciado pelo Zustand
  const { isVisible, message, type, hideToast } = useToastStore();

  // O Ionic tem um padrão próprio de cores (success para verde, danger para vermelho). 
  // Conversão para o teste de erro
  const corIonic = type === 'error' ? 'danger' : 'success';

  return (
    <IonToast
      isOpen={isVisible} // Controla a visibilidade
      message={message || ''} // O texto do balão
      color={corIonic} // A cor adaptada ao padrão Ionic
      duration={3000} // Fecha automaticamente após 3 segundos
      position="top" // Fica no topo da tela para não cobrir outros botões
      onDidDismiss={hideToast} // Assim que fechar ou expirar, avisa o Zustand para limpar o estado
    />
  );
};