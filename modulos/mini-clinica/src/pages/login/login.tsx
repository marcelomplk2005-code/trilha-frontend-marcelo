import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { 
  IonPage, IonContent, IonInput, IonButton, 
  IonItem, IonText, IonGrid, IonRow, IonCol, IonCard, IonCardContent
} from '@ionic/react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const login = useAuthStore((state) => state.login);
  const history = useHistory();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@admin.com' && password === '123456') {
      login();
      history.push('/pacientes');
    } else {
      setErro('Credenciais inválidas');
    }
  };

  return (
    <IonPage>
      {/* className="ion-padding" centraliza o conteúdo visualmente de forma responsiva */}
      <IonContent className="ion-padding">
        <IonGrid style={{ height: '100%' }}>
          <IonRow className="ion-align-items-center ion-justify-content-center" style={{ height: '100%' }}>
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard>
                <IonCardContent>
                  <IonText color="primary" className="ion-text-center">
                    <h2>Mini Clínica - Login</h2>
                  </IonText>
                  
                  <form onSubmit={handleLogin}>
                    <IonItem className="ion-margin-bottom">
                      <IonInput
                        type="email"
                        label="E-mail"
                        labelPlacement="floating"
                        value={email}
                        onIonInput={(e) => setEmail(e.detail.value!)}
                      />
                    </IonItem>
                    
                    <IonItem className="ion-margin-bottom">
                      <IonInput
                        type="password"
                        label="Senha"
                        labelPlacement="floating"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}
                      />
                    </IonItem>

                    {erro && (
                      <IonText color="danger" className="ion-text-center">
                        <p><small>{erro}</small></p>
                      </IonText>
                    )}

                    <IonButton expand="block" type="submit" className="ion-margin-top">
                      Entrar
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};