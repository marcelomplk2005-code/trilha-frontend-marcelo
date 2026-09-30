import { setupIonicReact, IonApp, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS obrigatório do Ionic */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { AppRoutes } from './routes';
import { Toast } from './components/Toast';
import { Menu } from './components/menu';
import './App.css';

// Inicializa o Ionic forçando o design do Android (Material Design), 
// para manter a consistência em qualquer dispositivo.
setupIonicReact({ mode: "md" });

export function App() {
  return (
    // IonApp é o container principal que engloba toda a tela
    <IonApp>
      {/* IonReactRouter substitui o BrowserRouter */}
      <IonReactRouter>
        <Toast />
        <IonSplitPane contentId="main-content" style={{ '--side-width': '220px', '--side-max-width': '220px' }}>
          <Menu />
          <AppRoutes />
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;