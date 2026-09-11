[← Trilha](../../README.md) · **Dias 4–6**

# 03 — JavaScript

**Objetivo:** escrever JS sem as armadilhas de quem vem de outra linguagem, e fazer chamadas assíncronas.

## Conceitos

- `let`/`const` (nunca `var`)
- `===` (nunca `==`), truthy/falsy, `null` e `undefined`
- Funções e arrow functions
- Arrays: `map`, `filter`, `find`, `reduce`
- Objetos, desestruturação, spread e template strings
- Módulos: `import` e `export`
- DOM: `querySelector` e `addEventListener`
- Assíncrono: Promises, `async/await`, `try/catch`, `fetch` e JSON

## Recursos

- [MDN — Uma reintrodução ao JavaScript (PT-BR, feito pra quem já programa)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Language_overview)
- [MDN — JavaScript Assíncrono (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Async_JS)
- [MDN — Usando Fetch (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
- [Vídeo: What the heck is the event loop anyway? (inglês, com legendas)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [ViaCEP](https://viacep.com.br/): o endpoint é `viacep.com.br/ws/{cep}/json/`

## Como fica no dia a dia

```js
const profissionais = [
  { id: "1", nome: "Dra. Helena Prado", ativo: true },
  { id: "3", nome: "Dra. Carla Menezes", ativo: false },
];

const nomesAtivos = profissionais
  .filter(p => p.ativo)
  .map(p => p.nome);
// ["Dra. Helena Prado"]

const { nome, ...resto } = profissionais[0];
// nome = "Dra. Helena Prado", resto = { id: "1", ativo: true }
```

## Entrega

Pasta `03-javascript/` no seu repositório:

1. Copie o conteúdo de [`dados/pacientes.json`](../../dados/pacientes.json) pra `pacientes.js`, como `export const pacientes = [...]`.
2. Crie `utils.js` exportando:
   - `formatarCPF(texto)`
   - `validarCelular(texto)`
   - `filtrarPorNome(pacientes, termo)`
3. Traga a ficha de cadastro do módulo 02. Ao digitar o CEP e sair do campo, a ficha busca o endereço no ViaCEP e preenche rua, bairro, cidade e UF.

As regras e as saídas esperadas estão em **[casos-de-teste.md](casos-de-teste.md)**.

Pra usar `import`/`export` no navegador, carregue o script com `<script type="module">` e sirva a pasta com `npx vite` (abrir o HTML direto do disco bloqueia módulos).

## Critérios de aceite

- [ ] Nenhum `var` nem `==` no código
- [ ] `utils.js` não toca no DOM (só funções puras)
- [ ] Todas as linhas de [casos-de-teste.md](casos-de-teste.md) dão o resultado esperado
- [ ] Mostra "Buscando..." enquanto a requisição do CEP roda
- [ ] Usa `async/await` com `try/catch`

---

**Próximo:** [04 — TypeScript](../04-typescript/README.md)
