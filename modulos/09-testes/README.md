[← Trilha](../../README.md) · **Dia 19**

# 09 — Testes

**Objetivo:** testar funções, schemas e telas com Vitest + Testing Library.

## Conceitos

- Vitest: `describe`, `it`, `it.each`, `expect`
- Testing Library: `render`, `screen` e a prioridade das queries (role primeiro)
- `userEvent`
- `vi.mock` pra mockar service

## Instalação

```
npm i -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/user-event
```

No `vite.config.ts`, adicione a referência de tipos e o ambiente `jsdom`:

```ts
/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
```

## Recursos

- [Vitest — Getting Started](https://vitest.dev/guide/)
- [Vitest — Mocking de módulos](https://vitest.dev/guide/mocking/modules)
- [React Testing Library — Intro](https://testing-library.com/docs/react-testing-library/intro/)
- [Prioridade das queries](https://testing-library.com/docs/queries/about#priority)

## Como fica no dia a dia

```tsx
// src/pages/Profissionais/Profissionais.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Profissionais } from "./index";

vi.mock("../../services/professionals", () => ({
  getProfissionais: vi.fn().mockResolvedValue([
    { id: "1", nome: "Dra. Helena Prado", especialidade: "Cardiologia" },
  ]),
}));

describe("Profissionais", () => {
  it("lista os profissionais vindos do service", async () => {
    render(<Profissionais />);
    expect(await screen.findByText("Dra. Helena Prado")).toBeTruthy();
  });
});
```

Se a tela usa rotas (`useHistory`, `useParams`), envolva o componente em `<MemoryRouter>` no `render`.

## Entrega

Três arquivos de teste na `mini-clinica`. Rode com `npx vitest run`.

- `utils.test.ts`: todas as linhas de [casos-de-teste.md](../03-javascript/casos-de-teste.md) (dica: `it.each`)
- `paciente.test.ts`: todos os casos de [casos-de-validacao.md](../07-formularios/casos-de-validacao.md), usando `schemaPaciente.safeParse`
- teste da tela de pacientes (ou do hook) com `src/services/` mockado via `vi.mock`

## Critérios de aceite

- [ ] Os testes de utils cobrem todas as linhas de `casos-de-teste.md`
- [ ] O teste do schema confere a **mensagem** de cada caso inválido, não só que deu erro
- [ ] O teste da tela roda sem a API fake no ar
- [ ] `npx vitest run` passa

---

**Próximo:** [10 — Entrega final](../10-entrega-final/README.md)
