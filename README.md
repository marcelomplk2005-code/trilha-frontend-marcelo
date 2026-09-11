# Trilha Frontend — Estagiários

**Duração:** 4 semanas · 6h/dia · 20 dias úteis
**Pré-requisito:** lógica de programação em qualquer linguagem.
**Stack:** HTML, CSS/SCSS, JavaScript, TypeScript, React, React Router v5, axios, zustand, react-hook-form + zod, Ionic React e Vitest.

No fim da trilha você terá construído a `mini-clinica`, uma gestão de pacientes organizada do jeito que os projetos reais são.

## Como usar este kit

```
trilha-frontend-estagiarios/
  README.md    este arquivo
  modulos/     um README por tema: conceitos, recursos, exemplos, entrega e critérios de aceite
  dados/       pacientes e profissionais fictícios, usados em todos os módulos
  api/         API fake (json-server) que serve esses dados, usada a partir do módulo 06
```

1. Crie **no seu** Github um repositório chamado `trilha-frontend-<seu-nome>`, e adicione o mentor como colaborador. Este kit é material de consulta; o seu código vai no seu repositório.
2. Siga os módulos na ordem. Cada um termina com **uma entrega em PR**, que o mentor revisa pelos critérios de aceite do módulo.
3. As entregas formam **um projeto contínuo**: cada módulo aproveita o anterior.
4. Os exemplos de código usam **profissionais** e a sua entrega é com **pacientes**. Entenda o padrão e aplique; não copie.

> **Pro mentor:** as versões citadas são as da stack padrão. Antes de começar, confira o `package.json` do projeto em que o estagiário vai atuar e ajuste a tabela do fim.

## Cronograma

| Semana | Dias | Módulo |
|---|---|---|
| 1 | 1 | [01 — Ambiente de trabalho](modulos/01-ambiente/README.md) |
| 1 | 2–3 | [02 — HTML e CSS/SCSS](modulos/02-html-css/README.md) |
| 1–2 | 4–6 | [03 — JavaScript](modulos/03-javascript/README.md) |
| 2 | 7–8 | [04 — TypeScript](modulos/04-typescript/README.md) |
| 2–3 | 9–11 | [05 — React](modulos/05-react/README.md) |
| 3 | 12–13 | [06 — Organização de um app real](modulos/06-app-real/README.md) |
| 3 | 14–15 | [07 — Formulários](modulos/07-formularios/README.md) |
| 4 | 16–18 | [08 — Ionic](modulos/08-ionic/README.md) |
| 4 | 19 | [09 — Testes](modulos/09-testes/README.md) |
| 4 | 20 | [10 — Entrega final](modulos/10-entrega-final/README.md) |

## Dados

Todos os dados são fictícios, e os e-mails usam o domínio reservado `example.com`.

**[`dados/pacientes.json`](dados/pacientes.json)**: 20 pacientes.

| Campo | Formato |
|---|---|
| `id` | string (`"1"`, `"2"`...) |
| `nome` | string |
| `cpf` | string com 11 dígitos, sem máscara |
| `dataNascimento` | string `AAAA-MM-DD` |
| `celular` | string com 11 dígitos, sem máscara |
| `email` | string |
| `sexo` | `"Feminino"` ou `"Masculino"` |
| `status` | `"Ativo"` ou `"Inativo"` |
| `cep` | string com 8 dígitos, sem máscara |
| `rua`, `bairro`, `cidade`, `uf` | string |

**[`dados/profissionais.json`](dados/profissionais.json)**: 8 profissionais.

| Campo | Formato |
|---|---|
| `id` | string |
| `nome` | string |
| `especialidade` | `"Clínico geral"`, `"Cardiologia"` ou `"Ortopedia"` |
| `crm` | string com 4 a 6 dígitos |
| `email` | string |
| `telefone` | string, **opcional** (alguns profissionais não têm) |
| `ativo` | boolean |

Os ids são **strings** porque é assim que a API fake gera ids novos. Tipe como `id: string` desde o começo.

## API fake

A partir do módulo 06, os dados vêm de uma API. Veja [api/README.md](api/README.md).

## ⚠️ Cuidado com tutoriais de outra versão

Quase todo conteúdo recente usa versões mais novas que as da trilha. Se aparecer um destes sinais, o material não serve:

| Lib | Versão da trilha | Instale com | Sinal de versão errada |
|---|---|---|---|
| React Router | v5 | `react-router-dom@5` | `<Routes>`, `element={...}`, `useNavigate`, `createBrowserRouter` |
| zod | v3 | `zod@3` | `z.email()` solto (fora de `z.string()`) |
| Ionic | v8 | `@ionic/react@8` | URL da doc sem `/v8/` (o padrão hoje é a v9) |
| React | 18 ou 19 | — | class components e `componentDidMount` (conteúdo antigo) |

Nem todo projeto da empresa usa exatamente essas versões. Há projetos em React 18 e zustand 4, e projetos sem Ionic que usam React Router v6. O que vale é o `package.json` do projeto em que você vai trabalhar.

**Não precisa estudar agora:** Redux, Next.js, TanStack Query, Tailwind, CSS Modules, Capacitor, i18n.
