import { 
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonIcon, IonLabel, IonMenuToggle 
} from '@ionic/react';
import { peopleOutline, logOutOutline } from 'ionicons/icons'; 
import { useAuthStore } from '../store/auth';

export const Menu = () => {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    // Se não houver token (ex: na tela de login), o menu não é desenhado.
    if (!token) return null;

    return (
    // contentId="main-content" diz ao menu qual é a caixa de conteúdo que ele vai empurrar/sobrepor.
    <IonMenu contentId="main-content" style={{ '--width': '220px' }}>
        <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-padding-start">Mini Clínica</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          
          {/* IonMenuToggle garante que, no celular, ao clicar no link, o menu se recolhe automaticamente */}
          <IonMenuToggle autoHide={false}>
            {/* routerLink já faz o papel do history.push internamente */}
            <IonItem routerLink="/pacientes" routerDirection="none" lines="none" style={{ cursor: 'pointer' }}>
              <IonIcon slot="start" icon={peopleOutline} />
              <IonLabel>Pacientes</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem onClick={logout} lines="none" style={{ cursor: 'pointer', color: 'red' }}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Sair do Sistema</IonLabel>
            </IonItem>
          </IonMenuToggle>

        </IonList>
      </IonContent>
    </IonMenu>
  );
};