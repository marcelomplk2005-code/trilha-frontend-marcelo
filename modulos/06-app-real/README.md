[← Trilha](../../README.md) · **Dias 12–13**

# 06 — Organização de um app real

**Objetivo:** organizar o app em camadas (página → hook → service → API) e usar rotas e estado global.

## Conceitos

- React Router **v5**: `BrowserRouter`, `Switch`, `Route`, `Redirect`, `useHistory`, `useParams`
- Instância do axios com `baseURL` e interceptors
- Camada de service: uma função por endpoint
- Hook customizado: junta estado e chamadas, e a página só consome
- Store global com zustand, incluindo `persist`

## Instalação

Na `mini-clinica`:

```
npm i react-router-dom@5 @types/react-router-dom@5 axios zustand
```

API fake: copie as pastas `api/` e `dados/` deste kit pra raiz do seu repositório e rode:

```
cd api
npm install
npm start
```

Endpoints, filtros e cuidados (como a diferença entre `PUT` e `PATCH`) estão em **[api/README.md](../../api/README.md)**.

## Recursos

- [React Router v5 — Quick Start](https://github.com/remix-run/react-router/blob/v5/packages/react-router-dom/docs/guides/quick-start.md) e [Hooks](https://github.com/remix-run/react-router/blob/v5/packages/react-router/docs/api/hooks.md)
- [axios — Primeiros passos](https://axios.rest/pages/getting-started/first-steps) e [Interceptors](https://axios.rest/pages/advanced/interceptors)
- [React — Hooks personalizados (PT-BR)](https://pt-br.react.dev/learn/reusing-logic-with-custom-hooks)
- [zustand — Introdução](https://zustand.docs.pmnd.rs/learn/getting-started/introduction) e [persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)

## Estrutura de pastas

```
mini-clinica/src/
  pages/        telas (uma pasta por tela)
  components/   componentes reutilizáveis
  hooks/        hooks customizados
  services/     chamadas à API (única camada que usa axios)
  store/        stores zustand
  types/        interfaces compartilhadas
  schemas/      schemas zod (módulo 07)
```

## Como fica no dia a dia

Os exemplos abaixo rodam de verdade contra a API fake: o recurso `/profissionais` existe nela.

```ts
// src/types/profissional.ts
export type Especialidade = "Clínico geral" | "Cardiologia" | "Ortopedia";

export interface Profissional {
  id: string;
  nome: string;
  especialidade: Especialidade;
  crm: string;
  email: string;
  telefone?: string;
  ativo: boolean;
}
```

```ts
// src/services/api.ts
import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.response.use(
  response => response,
  error => {
    console.error("Erro na API:", error.response?.status);
    return Promise.reject(error);
  }
);
```

```ts
// src/services/professionals.ts
import { api } from "./api";
import type { Profissional } from "../types/profissional";

export const getProfissionais = async (): Promise<Profissional[]> => {
  const { data } = await api.get<Profissional[]>("/profissionais");
  return data;
};

export const deleteProfissional = async (id: string): Promise<void> => {
  await api.delete(`/profissionais/${id}`);
};
```

```ts
// src/hooks/useProfissionais.ts
import { useEffect, useState } from "react";
import { getProfissionais } from "../services/professionals";
import type { Profissional } from "../types/profissional";

export const useProfissionais = () => {
  const [data, setData] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfissionais()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
```

```ts
// src/store/preferences.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesStore {
  compactList: boolean;
  toggleCompactList: () => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    set => ({
      compactList: false,
      toggleCompactList: () => set(state => ({ compactList: !state.compactList })),
    }),
    { name: "preferences" }
  )
);
```

```tsx
// src/pages/Profissionais/index.tsx
import { useProfissionais } from "../../hooks/useProfissionais";
import { usePreferencesStore } from "../../store/preferences";

export const Profissionais = () => {
  const { data, loading } = useProfissionais();
  const compactList = usePreferencesStore(state => state.compactList);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul className={compactList ? "list list--compact" : "list"}>
      {data.map(p => (
        <li key={p.id}>{p.nome}</li>
      ))}
    </ul>
  );
};
```

```tsx
// src/pages/ProfissionalEditar/index.tsx
import { useHistory, useParams } from "react-router-dom";

export const ProfissionalEditar = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  return (
    <>
      <p>Editando o profissional {id}</p>
      <button onClick={() => history.push("/profissionais")}>Voltar</button>
    </>
  );
};
```

```tsx
// src/routes.tsx
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ProfissionalEditar } from "./pages/ProfissionalEditar";
import { Profissionais } from "./pages/Profissionais";

export const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/profissionais" component={Profissionais} />
      <Route exact path="/profissionais/:id" component={ProfissionalEditar} />
      <Redirect to="/profissionais" />
    </Switch>
  </BrowserRouter>
);
```

## Entrega

Na `mini-clinica`:

- Os pacientes vêm da API fake, e não mais do arquivo local.
- Rotas `/login`, `/pacientes`, `/pacientes/novo` e `/pacientes/:id`.
- Login fake: qualquer e-mail entra e salva um usuário com token num store zustand com `persist`. O token pode ser `crypto.randomUUID()`.
- Excluir um paciente mostra um toast controlado por um store zustand.

**Dica de rota privada no v5:** um componente que renderiza `<Route>` quando há usuário no store e `<Redirect to="/login" />` quando não há.

## Critérios de aceite

- [ ] Segue a estrutura de pastas acima, e só `src/services/` importa o axios
- [ ] Um interceptor de **request** adiciona o header `Authorization` com o token do store (visível na aba Network)
- [ ] Recarregar a página (F5) em `/pacientes` mantém a sessão
- [ ] Acessar `/pacientes` deslogado redireciona pra `/login`
- [ ] URL desconhecida redireciona pra `/pacientes`
- [ ] Listar, criar, editar e excluir funcionam contra a API fake
- [ ] A edição usa `PATCH`, ou `PUT` com o objeto inteiro, sem apagar campos

---

**Próximo:** [07 — Formulários](../07-formularios/README.md)
