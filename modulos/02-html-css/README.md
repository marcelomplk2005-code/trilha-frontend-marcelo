[← Trilha](../../README.md) · **Dias 2–3**

# 02 — HTML e CSS/SCSS

**Objetivo:** montar e estilizar telas estáticas responsivas.

## Conceitos

- HTML semântico: `header`, `main`, `section`, `form`, `label`, `button`
- Tipos de input: `email`, `date`, `tel`
- Validação nativa: `required`, `pattern`
- Box model, Flexbox, media queries e variáveis CSS
- Sass: aninhamento, `&__elemento` e `&--modificador`
- Padrão de nomes BEM

## Recursos

- [MDN — Introdução ao HTML (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content)
- [MDN — Formulários da Web (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms)
- [MDN — Primeiros passos com CSS (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics)
- [MDN — Flexbox (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Flexbox) + [Flexbox Froggy (jogo, PT-BR)](https://flexboxfroggy.com/#pt-br)
- [MDN — Variáveis CSS (PT-BR)](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties)
- [Sass — guia básico](https://sass-lang.com/guide/) e [seletor pai `&`](https://sass-lang.com/documentation/style-rules/parent-selector/)
- [BEM 101 (CSS-Tricks)](https://css-tricks.com/bem-101/)

## Como fica no dia a dia

```scss
:root {
  --color-primary: #321d6f;
}

.professional-card {
  padding: 1rem;
  border: 1px solid var(--color-primary);

  &__name {
    font-weight: 600;
  }

  &--inactive {
    opacity: 0.5;
  }
}
```

## Entrega

Pasta `02-html-css/` no seu repositório, com:

- `cadastro.html`: ficha de paciente com os campos de [`dados/pacientes.json`](../../dados/pacientes.json) (nome, CPF, data de nascimento, celular, e-mail, sexo em um select, CEP, rua, bairro, cidade e UF) e um botão Salvar
- `pacientes.html`: cards com os **6 primeiros pacientes** de [`dados/pacientes.json`](../../dados/pacientes.json), mostrando nome, cidade/UF e status. Os dados vão escritos direto no HTML, sem JavaScript.
- Estilo escrito em SCSS e compilado com `npx sass`

## Critérios de aceite

- [ ] Todo input tem um `<label>` associado
- [ ] Enviar vazio mostra a validação do navegador nos campos obrigatórios
- [ ] Cards em 3 colunas no desktop e em 1 coluna abaixo de 768px
- [ ] A cor primária aparece uma única vez, como `--color-primary`
- [ ] Classes em BEM, com `&__` no SCSS
- [ ] O card de paciente inativo usa um modificador BEM (ex.: `patient-card--inactive`) e fica visualmente diferente

---

**Próximo:** [03 — JavaScript](../03-javascript/README.md)
