import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { useAuthStore } from './store/auth';
import { Login } from './pages/login/login';
import { Pacientes } from './pages/Pacientes';
import { PacienteForm } from './pages/PacienteForm';

interface PrivateRouteProps {
  component: React.ElementType;
  path?: string;
  exact?: boolean;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
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
    <IonRouterOutlet id="main-content">
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/pacientes" component={Pacientes}/>
        <PrivateRoute exact path="/pacientes/novo" component={PacienteForm} />
        <PrivateRoute exact path="/pacientes/:id" component={PacienteForm} />
        <Redirect to="/pacientes" />
    </IonRouterOutlet> 
);