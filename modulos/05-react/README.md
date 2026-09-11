[← Trilha](../../README.md) · **Dias 9–11**

# 05 — React

**Objetivo:** construir telas com componentes, estado e listas.

## Conceitos

- JSX
- Componentes e props tipadas
- `useState` e eventos
- Listas e `key`
- Renderização condicional
- `useEffect`, e quando **não** usar
- Levantar estado e `children`
- Componente composto (`Card.Default`, `Card.Highlight`)

## Recursos

- [React — Início rápido (PT-BR)](https://pt-br.react.dev/learn)
- [React — Pensando em React (PT-BR)](https://pt-br.react.dev/learn/thinking-in-react)
- [React — Sincronizando com Efeitos (PT-BR)](https://pt-br.react.dev/learn/synchronizing-with-effects)
- [Vite — Guia](https://vite.dev/guide/)

## Como fica no dia a dia

Componente composto: um objeto que agrupa variações do mesmo componente.

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Default = ({ title, children }: CardProps) => (
  <section className="card">
    <h2>{title}</h2>
    {children}
  </section>
);

const Highlight = ({ title, children }: CardProps) => (
  <section className="card card--highlight">
    <h2>{title}</h2>
    {children}
  </section>
);

export const Card = { Default, Highlight };

// uso: <Card.Highlight title="Dra. Helena Prado">Cardiologia</Card.Highlight>
```

O lint do template avisa `only-export-components` nesse arquivo. É só um aviso sobre o hot reload e não impede o build.

## Entrega

App `mini-clinica/` no seu repositório, criado com `npm create vite@latest mini-clinica -- --template react-ts`. A partir daqui, todos os módulos evoluem esse mesmo app.

- Traga `interface Paciente` e `src/pacientes.ts` do módulo 04.
- Página de pacientes listando os 20 pacientes.
- Busca por nome, reaproveitando o `filtrarPorNome`.
- Paginação de 5 em 5.
- Componente `Button` exportado como `Button.Default` e `Button.Outline`.

## Critérios de aceite

- [ ] Buscar volta pra página 1
- [ ] Mostra "Nenhum paciente encontrado" quando o filtro esvazia a lista
- [ ] `key` usa o `id`, não o índice
- [ ] Props tipadas com `interface`
- [ ] Anterior e Próxima ficam desabilitados nas pontas
- [ ] A lista filtrada é calculada direto do estado, sem `useEffect`

---

**Próximo:** [06 — Organização de um app real](../06-app-real/README.md)
