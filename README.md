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

Você pode executar os testes de duas maneiras: com a interface gráfica (interativa) ou via linha de comando (headless).

### Modo Interativo (Recomendado para desenvolvimento)

1.  **Abra o Cypress Test Runner:**
    ```bash
    npm run cy:open
    ```
    *Ou use o comando npx diretamente:*
    ```bash
    npx cypress open
    ```

2.  Na interface do Cypress, selecione o navegador e o teste que deseja executar.

### Modo Headless (Recomendado para CI/CD e execução rápida)

Para executar todos os testes em segundo plano, sem abrir a interface gráfica, use o comando:
```bash
npm run cy:run
```
*Ou use o comando npx diretamente:*
```bash
npx cypress run
```

## Testes Implementados

Este projeto contém os seguintes cenários de teste automatizados.

### `cypress/e2e/automation-exercise.cy.js`

*   **`Cadastrar um usuário`**: Este teste verifica o fluxo completo de cadastro de um novo usuário.
    1.  Acessa a página inicial do Automation Exercise.
    2.  Navega para a página de login/cadastro.
    3.  Inicia o processo de cadastro com um nome e um e-mail gerado dinamicamente.
    4.  Preenche todos os campos do formulário de informações da conta e endereço.
    5.  Submete o formulário.
    6.  Verifica se a conta foi criada com sucesso, confirmando a URL e a mensagem na tela.

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

6. ** Executar o cypress em modo headless**
    ```bash
    npx cypress run
    ````