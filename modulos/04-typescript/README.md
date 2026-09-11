[← Trilha](../../README.md) · **Dias 7–8**

# 04 — TypeScript

**Objetivo:** tipar código de verdade, no modo `strict`.

## Conceitos

- Tipos primitivos e arrays
- `type` e `interface`
- Opcionais (`?`)
- Unions literais, como `"Ativo" | "Inativo"`
- Narrowing: `typeof` e checagem de `null`
- Generics no uso: `Promise<T>`
- `strict: true`
- `unknown` em vez de `any`

## Recursos

- [TypeScript para programadores Java/C#](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)
- [Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Total TypeScript — Beginner's Tutorial (grátis, interativo)](https://www.totaltypescript.com/tutorials/beginners-typescript)

## Como fica no dia a dia

```ts
type Especialidade = "Clínico geral" | "Cardiologia" | "Ortopedia";

interface Profissional {
  id: string;
  nome: string;
  especialidade: Especialidade;
  telefone?: string;
}

export const descrever = (p: Profissional): string =>
  p.telefone ? `${p.nome} (${p.telefone})` : p.nome;
```

## Entrega

Projeto `04-typescript/` no seu repositório, criado com `npm create vite@latest 04-typescript -- --template vanilla-ts`:

- Leve pra ele o `utils.js` e a busca de CEP do módulo 03, convertidos pra `.ts`.
- Crie `interface Paciente`, com todos os campos de [`dados/pacientes.json`](../../dados/pacientes.json), e `interface EnderecoViaCep`.
- Copie o conteúdo de `dados/pacientes.json` pra `src/pacientes.ts`, como `export const pacientes: Paciente[] = [...]`.

## Critérios de aceite

- [ ] `npm run build` sem erros (o build roda o `tsc`)
- [ ] Zero `any` no código
- [ ] Assinatura `buscarCep(cep: string): Promise<EnderecoViaCep>`
- [ ] `status` tipado como `"Ativo" | "Inativo"` e `sexo` como `"Feminino" | "Masculino"`, não como `string`
- [ ] Os 20 pacientes copiados compilam como `Paciente[]` sem mudar nenhum valor

---

**Próximo:** [05 — React](../05-react/README.md)
