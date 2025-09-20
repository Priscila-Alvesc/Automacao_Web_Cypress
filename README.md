# Automação Web com Cypress

Este repositório contém um projeto de automação de testes web utilizando Cypress.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) (que inclui o npm) instalado em sua máquina.

## Instalação do Projeto Existente

Se você está clonando este repositório, siga os passos abaixo para configurar o ambiente.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Priscila-Alvesc/Automacao_Web_Cypress.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Automacao_Web_Cypress
    ```

3.  **Instale as dependências:**
    Este comando irá instalar o Cypress e outras dependências listadas no `package.json`.
    ```bash
    npm install
    ```

## Executando os Testes

Após a instalação, você pode abrir o Cypress Test Runner para executar os testes.

1.  **Abra o Cypress:**
    ```bash
    npx cypress open
    ```

2.  Siga as instruções na interface do Cypress para configurar o projeto (se for a primeira vez) e executar os testes.

## Testes Implementados

Este projeto contém os seguintes cenários de teste automatizados.

### `cypress/e2e/automation-exercise.cy.js`

*   **`Cadastrar um usuário`**: Este teste verifica o fluxo inicial de cadastro de um novo usuário.
    1.  Acessa a página inicial: `https://automationexercise.com/`.
    2.  Clica no link "Signup / Login" para navegar até a página de login/cadastro.

---

---

## Criando um Novo Projeto Cypress do Zero (Passo a Passo)

Estas são as instruções para iniciar um projeto de automação com Cypress do zero.

1.  **Criar nosso diretório:**
    ```bash
    mkdir meu-projeto-cypress
    ```

2.  **Abrir no editor de textos:**
    ```bash
    cd meu-projeto-cypress
    code .
    ```

3.  **Inicializar um projeto npm:**
    ```bash
    npm init --yes
    ```

4.  **Instalar o Cypress:**
    ```bash
    npm install -D cypress
    ```

5.  **Abrir e iniciar a configuração do projeto:**
    ```bash
    npx cypress open
    ```

6.  **Avançar até executar o primeiro teste:**
    Siga as instruções na janela do Cypress que será aberta para configurar seu projeto e rodar os testes de exemplo.