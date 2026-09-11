[← Trilha](../../README.md) · **Dias 16–18**

# 08 — Ionic

**Objetivo:** usar os componentes Ionic que as telas dos projetos usam.

> **Pro mentor:** se o projeto do estagiário não usa Ionic, use estes 3 dias pra aprofundar a versão do React Router e a biblioteca de componentes que o projeto usa.

## Conceitos

- `setupIonicReact`, `IonApp`, `IonReactRouter` e `IonRouterOutlet`
- Estrutura de página: `IonPage`, `IonHeader`, `IonContent`
- Componentes: `IonButton`, `IonInput`, `IonList`/`IonItem`, `IonModal`, `IonToast`
- Menu lateral: `IonMenu` + `IonSplitPane`
- Ícones com `ionicons`
- Theming por variáveis CSS e `::part`

## Instalação

```
npm i @ionic/react@8 @ionic/react-router@8 ionicons
```

## Recursos (doc da v8, a versão da trilha)

- [Quickstart](https://ionicframework.com/docs/v8/react/quickstart)
- [Navegação (usa React Router v5)](https://ionicframework.com/docs/v8/react/navigation)
- [Lista de componentes](https://ionicframework.com/docs/v8/components)
- [ion-modal](https://ionicframework.com/docs/v8/api/modal)
- [ion-split-pane](https://ionicframework.com/docs/v8/api/split-pane)
- [Variáveis CSS](https://ionicframework.com/docs/v8/theming/css-variables)
- [CSS Shadow Parts (`::part`)](https://ionicframework.com/docs/v8/theming/css-shadow-parts)

## Como fica no dia a dia

Setup, feito uma vez só (em `src/main.tsx` ou `src/App.tsx`):

```tsx
import { setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact({ mode: "md" });
```

Uma página:

```tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export const Profissionais: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Profissionais</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">{/* conteúdo */}</IonContent>
  </IonPage>
);
```

`IonInput` com react-hook-form. O `register` não funciona direto no `IonInput`, então use `Controller`:

```tsx
<Controller
  name="nome"
  control={control}
  render={({ field }) => (
    <IonInput
      label="Nome"
      value={field.value}
      onIonInput={e => field.onChange(e.detail.value ?? "")}
      onIonBlur={field.onBlur}
    />
  )}
/>
```

Estilizando por dentro de um componente Ionic:

```scss
.save-button {
  --background: var(--color-primary);

  &::part(native) {
    border-radius: 1rem;
  }
}
```

## Entrega

Portar a `mini-clinica` pra Ionic.

## Critérios de aceite

- [ ] Menu lateral com "Pacientes" e "Sair", fixo no desktop e recolhido em telas pequenas
- [ ] Inputs trocados por `IonInput`, e os casos de [casos-de-validacao.md](../07-formularios/casos-de-validacao.md) continuam mostrando as mensagens
- [ ] Excluir abre um `IonModal` de confirmação, e cancelar não exclui
- [ ] O toast do store aparece como `IonToast`
- [ ] `--ion-color-primary` definido com a cor primária do projeto
- [ ] Rotas continuam em React Router v5

---

**Próximo:** [09 — Testes](../09-testes/README.md)
