import { useToastStore } from '../../store/toast';

export const Toast = () => {
  // O componente "escuta" o cofre global criado em toast.ts
  const { message, type, isVisible, hideToast } = useToastStore();

  // Se o interruptor estiver desligado, o React não desenha nada no ecrã
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
      color: '#fff',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      zIndex: 9999,
      transition: 'all 0.3s ease-in-out'
    }}>
      <span style={{ fontWeight: 500 }}>{message}</span>
      
      {/* Botão de fechar manualmente antes dos 3 segundos */}
      <button 
        onClick={hideToast}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ✕
      </button>
    </div>
  );
};