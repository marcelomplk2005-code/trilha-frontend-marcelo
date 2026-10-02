# Mini Clínica - Gestão de Pacientes
Este é um projeto front-end de gestão de pacientes desenvolvido com **React, TypeScript e Ionic**.
A aplicação permite listar, criar, editar e excluir pacientes, garantindo uma interface responsiva e validação de dados robusta.

## Principais Execuções:
- **Listagem de Pacientes:** Exibe os pacientes registados utilizando o grid responsivo do Ionic.
- **Formulário de Registo/Edição:** Formulário validado com **Zod** e **React Hook Form**.
- **Busca de CEP:** Integração com a API ViaCEP para preenchimento automático do endereço.
- **Feedback Visual:** Notificações globais utilizando **Zustand** para o estado e `IonToast` para a UI.

## Tecnologias Utilizadas
- **React & TypeScript:** Base lógica e tipagem.
- **Ionic Framework:** Componentes de interface e layout responsivo (`IonGrid`, `IonModal`, etc).
- **Zustand:** Gestão de estado global (Notificações/Toasts).
- **Axios:** Comunicação HTTP com a API.
- **Vitest & Testing Library:** Testes unitários e de integração.


## Como Rodar o Projeto Localmente:
Para que a aplicação funcione corretamente, é necessário rodar a API simulada e o Front-end simultaneamente.
Para isso:
**1. Iniciar a API Fake:**
Abra um terminal, acesse a pasta da API e inicie o servidor da seguinte forma:
```bash
cd api
npm install
npm start 
``` 

**2. Iniciar a Aplicação:**
Abra um novo terminal (mantenha o da API aberto), acesse a pasta da aplicação e inicie o Vite:
```bash
cd mini-clinica
npm install
npm run dev
```
Acesse o endereço http://localhost:5173 no seu navegador.

**Importante!**
Para acessar a interface de pacientes é necessário logar com as credenciais válidas
**email:** *admin@admin.com* e **senha:** *123456*


**Como Rodar os testes?**
O projeto possui opções de testes que validam utilitários, schemas do Zod e o comportamento da UI.
Para executar os testes, execute o seguinte comando na pasta *mini-clinica:*
```bash
npm vitest run
```


