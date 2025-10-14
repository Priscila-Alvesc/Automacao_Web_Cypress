//describe -> suíte ou conjunto  de testes em um mesmo arquivo
// it -> um teste dentor de um bloco ou conjunto de testes
///<reference types="cypress"/>

import { faker } from '@faker-js/faker';
import contactData from '../fixtures/example.json';
import userFixture from '../fixtures/user.json';

import {
  getPass
} from '../support/helpers'

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contact from '../modules/contato'
import contato from '../modules/contato';

describe('Automation-exercise', () => {

   beforeEach(() => {
        cy.viewport('iphone-xr');
        cy.visit('https://automationexercise.com/');
        menu.navegarParaLogin();
    });

    it('Cadastrar um usuário', () => {
        menu.navegarParaLogin();
        const userEmail = faker.internet.email();
        const userPassword = getPass();

         login.preencherFormularioPreCadastro(userEmail);
         cadastro.preencherFormularioCadastroCompleto(userPassword);

        // Assert: Verificar se a conta foi criada com sucesso
        cy.url().should('includes', 'account_created')
        cy.get('b').should('have.text', 'Account Created!')
     });

     it('Login de Usuário com e-mail e senha válidos', () => {
        // Arrange: Os dados são carregados do arquivo user.json
        menu.navegarParaLogin();
        login.preencherFormularioDeLogin(userFixture.email, userFixture.password);

        cy.url().should('not.include', '/login');
        cy.get('i.fa-user').parent().should('contain', 'Logged in as');
        cy.get('a[href="/logout"]').should('be.visible')
        
     });

    it('Login de Usuário com e-mail e senha incorretos', () => {
       menu.navegarParaLogin();
        menu.navegarParaLogin();
        login.preencherFormularioDeLogin('emailinvalido@emeal.com', 32321);

        // Assert: Verificar a mensagem de erro (encadeando as assertivas)
        cy.get('.login-form > form > p')
            .should('contain', 'Your email or password is incorrect!');
        cy.url().should('include', '/login');
                
    });  

    it('Logout de Usuário', () => {
        // Arrange: Fazer login para poder testar o logout
        login.preencherFormularioDeLogin(userFixture.email, userFixture.password);
        menu.efetuarLogout();

        // Assert: Verificar se o logout redirecionou para a página de login
        cy.url().should('contain', '/login');
        cy.contains('Login to your account').should('be.visible');
    });
    
    it('Cadastrar Usuário com e-mail existente no sistema', () => {
        menu.navegarParaLogin();
        cadastro.preencherFormularioDeLoginUserExistente()
;
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
        
    });

    it('Enviar um formulario de contato com upload do arquivo', () => {
        // Arrange
        contato.navegarParaContato();
        contato.preencherFormulario(contactData);
        // O caminho do arquivo para o comando `selectFile`
        contato.anexarArquivo('cypress/fixtures/example.json');

        // Act: Submeter o formulário
        cy.get('[data-qa="submit-button"]').click();

        // Assert: Verificar a mensagem de sucesso
        cy.get('.status.alert-success').should('be.visible')
            .and('have.text', 'Success! Your details have been submitted successfully.');
      });
});