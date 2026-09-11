[← Trilha](../README.md)

# API fake

API REST local feita com [json-server](https://github.com/typicode/json-server) (versão `1.0.0-beta.15`), servindo os dados de [`../dados`](../dados). Ela é usada a partir do [módulo 06](../modulos/06-app-real/README.md).

## Como subir

Precisa de Node 22.12 ou mais novo.

```
cd api
npm install
npm start
```

A API sobe em `http://localhost:3000`. Na primeira vez, o `npm start` gera o `api/db.json` a partir de `dados/`.

**No seu repositório:** copie as pastas `api/` e `dados/` deste kit pra raiz. O script procura os dados em `../dados`, então as duas pastas precisam ficar lado a lado.

## Resetar os dados

O json-server grava toda alteração (POST, PATCH, PUT, DELETE) no `api/db.json`. Pra voltar aos dados originais, pare a API e rode:

```
npm run reset
```

## Endpoints

Os recursos são `/pacientes` e `/profissionais`. Os exemplos abaixo usam pacientes; profissionais funcionam igual.

| Ação | Requisição | Resposta |
|---|---|---|
| Listar | `GET /pacientes` | array com os 20 pacientes |
| Buscar por id | `GET /pacientes/1` | o paciente, ou `404` se não existir |
| Criar | `POST /pacientes` com o JSON no corpo | o paciente criado, com `id` gerado |
| Alterar alguns campos | `PATCH /pacientes/1` só com os campos que mudam | o paciente atualizado |
| Substituir | `PUT /pacientes/1` com o objeto **inteiro** | o paciente exatamente como foi enviado |
| Excluir | `DELETE /pacientes/1` | `200` |

⚠️ **`PUT` substitui o registro inteiro:** campos que não forem enviados somem. Pra editar só alguns campos, use `PATCH`.

⚠️ **Ids novos são strings aleatórias** (ex.: `"kL17oWfbmBg"`), não números sequenciais. Por isso todos os ids dos dados já são strings.

## Filtro, busca, ordenação e paginação

| O quê | Exemplo | Observação |
|---|---|---|
| Filtro por igualdade | `GET /pacientes?status=Inativo` | retorna os 4 inativos |
| Busca por trecho | `GET /pacientes?nome:contains=ana` | não diferencia maiúsculas: `ana` e `Ana` trazem os mesmos 5 pacientes |
| Ordenação | `GET /pacientes?_sort=nome` | `_sort=-nome` ordena ao contrário |
| Paginação | `GET /pacientes?_page=2&_per_page=5` | muda o formato da resposta (veja abaixo) |

Dá pra combinar, por exemplo: `GET /pacientes?_sort=nome&_page=1&_per_page=5`.

Com `_page`, a resposta deixa de ser um array e vira um objeto:

```jsonc
{
  "first": 1,
  "prev": 1,
  "next": 3,
  "last": 4,
  "pages": 4,
  "items": 20,
  "data": [ /* pacientes 6 a 10 */ ]
}
```

## CORS e autenticação

A API aceita chamadas de um app rodando em outra porta (ex.: `localhost:5173`) e aceita o header `Authorization`. Ela **não valida token nenhum**: a autenticação do módulo 06 é só de mentira.
