import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { Login } from './pages/login/login';
import { Pacientes } from './pages/Pacientes';
import { PacienteForm } from './pages/PacienteForm';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const token = useAuthStore((state) => state.token);
    return (
    <Route 
      {...rest} 
      render={(props) => (
        token ? <Component {...props} /> : <Redirect to="/login" /> 
      )} 
    />
  );
};

export const AppRoutes = () => (
    // Agora este componente devolve DIRETAMENTE o <Switch>, deixando este arquivo responsável APENAS por decidir qual página abrir.
    <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/pacientes" component={Pacientes}/>
        <PrivateRoute exact path="/pacientes/novo" component={PacienteForm} />
        <PrivateRoute exact path="/pacientes/:id" component={PacienteForm} />
        <Redirect to="/pacientes" /> 
    </Switch>
);