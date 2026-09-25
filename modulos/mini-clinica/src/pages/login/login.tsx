import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export const Login = () => {
  // Memória de curto prazo só dessa tela.
  // Guarda o que o usuário digita no campo de e-mail em tempo real.
  const [email, setEmail] = useState('');

  // useHistory (Router v5): Permite trocar de página via código.
  const history = useHistory(); 
  // login (Zustand): Puxamos apenas a função 'login' da memória global.
  const login = useAuthStore((state) => state.login); 

  // Função que roda quando o usuário clica em "Entrar"
  const handleLogin = (e: React.FormEvent) => {
    // Evita o comportamento padrão do navegador de recarregar a página ao dar submit
    e.preventDefault(); 
    
    //Gera o token (crypto.randomUUID) e salva no LocalStorage para resistir ao F5.
    login();

    // Se validado vai para a área restrita.
    history.push('/pacientes');
  };

  return (
    <div className="painel" style={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
      <div className="cadastro" style={{ margin: '0 auto' }}>
        <h1 className="cadastro__titulo">Entrar no Sistema</h1>
        
        <form className="cadastro__formulario" onSubmit={handleLogin}>
          <div className="cadastro__campo">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email"
              type="email" 
              placeholder="Digite qualquer e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-default" style={{ width: '100%', marginTop: '10px' }}>
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};