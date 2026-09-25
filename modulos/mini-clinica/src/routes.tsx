import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { Login } from './pages/login/login';
import { Pacientes } from './pages/Pacientes';
import { PacienteForm } from './pages/PacienteForm';
import { Toast } from './components/Toast';

//Para não precisar repetir a lógica de segurança em cada tela.
//Esse componente intercepta a tentativa do usuário de acessar uma rota e verifica o Zustand.
const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const token = useAuthStore((state) => state.token);
    return (
    <Route 
      {...rest} // Repassa as propriedades da rota (como o path exact)
      render={(props) => (
        token ? <Component {...props} /> : <Redirect to="/login" /> 
      )} // Se o token for null, intercepta e redireciona (Redirect) para a tela de login.
    />
  );
};

//Decide o que aparece na tela baseado no que está escrito na barra de endereços do navegador (URL).
export const AppRoutes = () => (
    // BrowserRouter: Avisa ao navegador que o React assumiu o controle das URLs.
    <BrowserRouter>
      <Toast />
        <Switch>{/*lê as rotas de cima para baixo e para na PRIMEIRA que der "match" com a URL digitada.*/}
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/pacientes" component={Pacientes}/>
            <PrivateRoute exact path="/pacientes/novo" component={PacienteForm} />
            <PrivateRoute exact path="/pacientes/:id" component={PacienteForm} />
            <Redirect to="/pacientes" /> 
        </Switch>
    </BrowserRouter>
);