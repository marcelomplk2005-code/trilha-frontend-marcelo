import axios from 'axios';
import { useAuthStore } from '../store/auth';

export const api = axios.create({ baseURL: 'http://localhost:3000' });//Memoriza o endereço do servidor 

api.interceptors.request.use((config) => { //Antes da requisição sair do front, passa pela função
  const token = useAuthStore.getState().token;
  if (token && config.headers) { 
    config.headers.Authorization = `Bearer ${token}`; //Credencial de segurança
    }
  return config;
});