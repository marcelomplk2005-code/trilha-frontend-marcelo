[← Módulo 07](README.md)

# Casos de validação — formulário de paciente

Use esta tabela pra conferir o formulário (módulo 07) e pra escrever o teste do schema (módulo 09).

**Regra geral:** quando um campo tem mais de um problema, aparece só a primeira mensagem. É o comportamento padrão do `zodResolver`, desde que a checagem de "vazio" venha antes das outras no schema.

| Campo | Entrada | Mensagem esperada |
|---|---|---|
| `nome` | *(vazio)* | Informe o nome |
| `nome` | `Ana Beatriz Souza` | *(nenhuma)* |
| `cpf` | *(vazio)* | Informe o CPF |
| `cpf` | `123` | CPF deve ter 11 dígitos |
| `cpf` | `12345678901` | *(nenhuma)* |
| `cpf` | `123.456.789-01` | *(nenhuma — aceita com ou sem máscara)* |
| `dataNascimento` | *(vazio)* | Informe a data de nascimento |
| `dataNascimento` | `2999-01-01` | Data de nascimento não pode ser futura |
| `dataNascimento` | `1990-04-12` | *(nenhuma)* |
| `celular` | *(vazio)* | Informe o celular |
| `celular` | `1187654321` | Celular inválido |
| `celular` | `11887654321` | Celular inválido |
| `celular` | `(11) 98765-4321` | *(nenhuma)* |
| `email` | *(vazio)* | Informe o e-mail |
| `email` | `ana@` | E-mail inválido |
| `email` | `ana.souza@example.com` | *(nenhuma)* |

Pro celular, reaproveite o `validarCelular` do módulo 03 dentro de um `.refine`.
