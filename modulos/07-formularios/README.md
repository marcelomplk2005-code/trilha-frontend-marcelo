[← Trilha](../../README.md) · **Dias 14–15**

# 07 — Formulários

**Objetivo:** formulários validados com react-hook-form + zod.

## Conceitos

- `useForm`, `register`, `handleSubmit`, `formState.errors`, `defaultValues` e `reset` (pra edição)
- `Controller`
- zod: `z.object`, `.min`, `.email`, `.refine`
- `zodResolver`
- `z.infer` pra tipar o formulário

## Instalação

```
npm i react-hook-form @hookform/resolvers zod@3
```

## Recursos

- [React Hook Form — Get Started](https://react-hook-form.com/get-started): seções "Integrating Controlled Inputs" e "Schema Validation"
- [Zod **v3** — README](https://github.com/colinhacks/zod/tree/v3): seções "Type inference" e ".refine"

## Como fica no dia a dia

```ts
// src/schemas/profissional.ts
import { z } from "zod";

export const schemaProfissional = z.object({
  nome: z.string().min(1, "Informe o nome"),
  email: z.string().min(1, "Informe o e-mail").email("E-mail inválido"),
  crm: z.string().refine(v => /^\d{4,6}$/.test(v), "CRM deve ter de 4 a 6 dígitos"),
});

export type ProfissionalForm = z.infer<typeof schemaProfissional>;
```

```tsx
// src/pages/ProfissionalForm/index.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemaProfissional, type ProfissionalForm } from "../../schemas/profissional";

export const FormularioProfissional = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfissionalForm>({
    resolver: zodResolver(schemaProfissional),
  });

  const salvar = async (dados: ProfissionalForm) => {
    console.log(dados);
  };

  return (
    <form onSubmit={handleSubmit(salvar)}>
      <label htmlFor="nome">Nome</label>
      <input id="nome" {...register("nome")} />
      {errors.nome && <span>{errors.nome.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        Salvar
      </button>
    </form>
  );
};
```

## Entrega

Na `mini-clinica`, o formulário de criar/editar paciente passa a usar RHF + zod, com o schema em `src/schemas/paciente.ts`.

As regras e as mensagens exatas estão em **[casos-de-validacao.md](casos-de-validacao.md)**.

## Critérios de aceite

- [ ] O tipo do formulário vem de `z.infer`, sem interface duplicada
- [ ] Todos os casos de [casos-de-validacao.md](casos-de-validacao.md) mostram exatamente a mensagem esperada
- [ ] A mensagem de erro aparece embaixo do campo
- [ ] Na edição, o formulário abre preenchido
- [ ] Salvar fica desabilitado enquanto envia

**Bônus:** digitar o CEP preenche o endereço com a busca do módulo 03 (use `setValue`).

---

**Próximo:** [08 — Ionic](../08-ionic/README.md)
