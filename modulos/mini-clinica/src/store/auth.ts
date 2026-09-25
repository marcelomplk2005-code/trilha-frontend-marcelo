import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState { //"Avisa" o TypeScript que o estado de autenticação terá essas propriedades:
                      //uma variavel token, uma função login e uma função logout 
  token: string | null;
  login: () => void;
  logout: () => void;
}

//Zustard cria o hook global useAuthStore
export const useAuthStore = create<AuthState>()( //O <AuthState> garante que o Zustand siga estritamente o "contrato" definido na interface AuthState
  persist( //Mantem o estado de autenticação mesmo após o usuário atualizar a página ou fechar o navegador
    (set) => ({
      token: null,
      login: () => set({ token: crypto.randomUUID() }), //Gera um token aleatório para simular o login do usuário
      logout: () => set({ token: null }), //Remove o token para simular o logout do usuário
    }),
    { name: 'auth-storage' }
  )
);