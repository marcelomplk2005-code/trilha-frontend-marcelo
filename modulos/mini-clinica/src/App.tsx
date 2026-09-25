import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Toast } from './components/Toast';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Toast />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;