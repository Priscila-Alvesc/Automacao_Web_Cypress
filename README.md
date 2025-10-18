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

### Testes da Aplicação "Automation Exercise"

Os arquivos `automation-exercise.cy.js`, `automation-exercise.xpath.cy.js` e `automation-exercise.modules.cy.js` cobrem os seguintes fluxos:

*   **Cadastro de Usuário**:
    *   `Cadastrar um usuário`: Verifica o fluxo completo de cadastro de um novo usuário com dados dinâmicos.
    *   `Cadastrar Usuário com e-mail existente`: Valida a mensagem de erro ao tentar cadastrar um e-mail que já existe.

*   **Autenticação**:
    *   `Login de Usuário com e-mail e senha válidos`: Testa o login com credenciais corretas.
    *   `Login de Usuário com e-mail e senha incorretos`: Valida a mensagem de erro para credenciais inválidas.
    *   `Logout de Usuário`: Verifica se o usuário consegue sair do sistema e é redirecionado para a página de login.

*   **Produtos**:
    *   `Verificar produtos na página de produtos`: Acessa a página de produtos, valida a quantidade de itens e verifica os detalhes do primeiro produto.
    *   `Deve buscar por um produto e verificar o resultado`: Testa a funcionalidade de busca e valida se o produto correto é exibido.

*   **Contato**:
    *   `Enviar um formulario de contato com upload do arquivo`: Preenche o formulário de contato, anexa um arquivo e valida a mensagem de sucesso.

### Testes de Interações Diversas (`drag-and-drop-and-windows.cy.js`)

Este arquivo testa funcionalidades específicas do navegador em um ambiente de demonstração (`the-internet.herokuapp.com`).

*   **`Deve abrir um link em uma nova aba e validar seu conteúdo`**:
    1.  Acessa a página de teste de janelas.
    2.  Clica em um link que abriria uma nova aba, mas remove o atributo `target` para que a página carregue na mesma aba.
    3.  Valida o conteúdo e a URL da nova página.

*   **`Deve arrastar o elemento A para o elemento B`**:
    1.  Acessa a página de "drag and drop".
    2.  Simula o arraste de um elemento para a posição de outro.
    3.  *Observação: Este teste requer um plugin como `@4tw/cypress-drag-drop` para funcionar de forma robusta.*
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