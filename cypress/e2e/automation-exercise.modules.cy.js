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

       it('Verificar produtos na página de produtos', () => {
        menu.pesquisarProduto();
        cy.get('.features_items .product-image-wrapper').should('have.length', 34)
 
        // Clica no link 'View Product' do primeiro produto da lista
        cy.get('.features_items .product-image-wrapper').first().contains('View Product').click();
        cy.url().should('include', '/product_details/1');
 
        // Agrupa as asserções dentro do escopo do elemento '.product-information'
        cy.get('.product-information').should('be.visible')
            .within(() => {
                cy.get('h2').should('have.text', 'Blue Top');
                cy.contains('p', 'Category:').should('be.visible');
                cy.get('span').contains('Rs. 500').should('be.visible');
                cy.contains('p', 'Availability:').should('contain.text', 'In Stock');
                cy.contains('p', 'Condition:').should('contain.text', 'New');
                cy.contains('p', 'Brand:').should('contain.text', 'Polo');
            });
    });
 
    it('Deve buscar por um produto e verificar o resultado', () => {
        menu.pesquisarProduto();
 
        cy.get('[id="search_product"]').type('blue top');
        cy.get('[id="submit_search"]').click();
        cy.get('.features_items .product-image-wrapper').should('have.length', 1);
        cy.url().should('include', '/products?search=blue%20top');
 
        // Verifica o título e os detalhes do produto encontrado
        cy.get('.features_items').within(() => {
            cy.get('.title').should('have.text', 'Searched Products');
            cy.get('.productinfo img').should('be.visible');
            cy.get('.productinfo p').should('contain.text', 'Blue Top');
        });
    });
});