[← Módulo 03](README.md)

# Casos de teste — módulo 03

Use estas tabelas pra conferir as funções no console do navegador (módulo 03) e pra escrever os testes automatizados (módulo 09).

## `formatarCPF(texto)`

**Regra:** remova tudo que não é dígito. Se sobrarem exatamente 11 dígitos, retorne no formato `000.000.000-00`. Caso contrário, retorne o texto original, sem alteração.

| Entrada | Saída esperada |
|---|---|
| `"12345678901"` | `"123.456.789-01"` |
| `"123.456.789-01"` | `"123.456.789-01"` |
| `"1234567890"` | `"1234567890"` |
| `""` | `""` |
| `"abc"` | `"abc"` |

## `validarCelular(texto)`

**Regra:** remova tudo que não é dígito. É válido quando sobram 11 dígitos e o terceiro dígito (o primeiro depois do DDD) é `9`. Não precisa checar se o DDD existe.

| Entrada | Saída esperada | Por quê |
|---|---|---|
| `"11987654321"` | `true` | |
| `"(11) 98765-4321"` | `true` | a máscara é ignorada |
| `"1187654321"` | `false` | 10 dígitos |
| `"11887654321"` | `false` | não começa com 9 depois do DDD |
| `"119876543210"` | `false` | 12 dígitos |
| `""` | `false` | |

## `filtrarPorNome(pacientes, termo)`

**Regra:** ignore os espaços nas pontas do termo e não diferencie maiúsculas de minúsculas. Termo vazio retorna a lista inteira. Use os pacientes de [`dados/pacientes.json`](../../dados/pacientes.json).

| Termo | Quantidade | Pacientes |
|---|---|---|
| `"ana"` | 5 | Ana Beatriz Souza, Mariana Costa Lima, Luana Ferreira, Juliana Rocha, Joana D'Arc Nascimento |
| `"JOÃO"` | 1 | João Pedro Almeida |
| `"Rocha"` | 1 | Juliana Rocha |
| `"xyz"` | 0 | — |
| `""` | 20 | todos |
| `"   "` | 20 | todos |

**Bônus:** com a regra acima, `"joao"` (sem acento) retorna 0. Fazer encontrar "João" é opcional (dica: `normalize("NFD")`).

## Busca de CEP (ViaCEP)

| CEP digitado | O que deve acontecer |
|---|---|
| `01001000` | Preenche rua "Praça da Sé", bairro "Sé", cidade "São Paulo" e UF "SP" |
| `01001-000` | Igual ao anterior: remova o hífen antes de chamar a API |
| `99999999` | A API responde `{"erro": "true"}` (com `"true"` em texto). Mostre "CEP não encontrado". |
| `123` | Não chama a API (ela responderia HTTP 400). Mostre "CEP inválido". |
| qualquer CEP, sem internet | Mostre "Não foi possível buscar o CEP" |
