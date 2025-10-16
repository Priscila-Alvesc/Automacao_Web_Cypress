//describe -> suíte ou conjunto  de testes em um mesmo arquivo
// it -> um teste dentor de um bloco ou conjunto de testes
///<reference types="cypress"/>

import { faker } from '@faker-js/faker'
import userData from '../fixtures/example.json'
import {
    getPass
} from '../support/helpers'

describe('Automation-exercise', () => {
    let userEmail;
    let userPassword;

    beforeEach(() => {
        cy.viewport('iphone-xr');
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
    });

    it('Cadastrar um usuário', () => {
        userEmail = faker.internet.email();
        userPassword = getPass();

        // Act: Iniciar o processo de cadastro
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName())
        cy.get('[data-qa="signup-email"]').type(userEmail)
        cy.contains('button', 'Signup').click()

        cy.get('b').should('contain.text', 'Enter Account Information')
        cy.get('input[type="radio"]').check('Mr')

        cy.get('input#password').type(userPassword, {log:false})
        const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
        cy.get('select[data-qa="days"]').select(birthDate.getDate().toString());
        cy.get('select[data-qa="months"]').select(birthDate.toLocaleString('en-US', { month: 'long' }));
        cy.get('select[data-qa="years"]').select(birthDate.getFullYear().toString());

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('input#address2').type(faker.location.secondaryAddress())
        cy.get('select#country').select('New Zealand')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number())

        // Act: Criar a conta
        cy.get('[data-qa="create-account"]').click()

        // Assert: Verificar se a conta foi criada com sucesso
        cy.url().should('includes', 'account_created')
        cy.get('b').should('have.text', 'Account Created!')

     });

     it('Login de Usuário com e-mail e senha válidos', () => {
        // Arrange: Navegar para a página de login e usar os dados do teste anterior
        cy.get('[data-qa="login-email"]').type(userEmail);
        cy.get('[data-qa="login-password"]').type(userPassword);

        // Act: Fazer login
        cy.get('[data-qa="login-button"]').click();

        cy.url().should('not.include', '/login');
        cy.get('i.fa-user').parent().should('contain', 'Logged in as');
        cy.get('a[href="/logout"]').should('be.visible')
        
     });

    it('Login de Usuário com e-mail e senha incorretos', () => {
       // Act: Tentar fazer login com credenciais inválidas
        cy.get('[data-qa="login-email"]').type('email-invalido@teste.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()

        // Assert: Verificar a mensagem de erro (encadeando as assertivas)
        cy.get('.login-form > form > p')
            .should('contain', 'Your email or password is incorrect!');
        cy.url().should('include', '/login');
                
    });  

    it('Logout de Usuário', () => {
        // Arrange: Navegar para a página de login e usar os dados do teste anterior
        cy.xpath('//*[@data-qa="login-email"]').type(userEmail);
        cy.xpath('//*[@data-qa="login-password"]').type(userPassword);

        // Act: Fazer login
        cy.xpath('//*[@data-qa="login-button"]').click();

        // Assert: Verificar se o login foi bem-sucedido
        cy.url().should('not.include', '/login');
        cy.xpath('//*[contains(text(),"Logged in as")]').should('be.visible');

        // Act: Fazer logout
        cy.xpath('//a[@href="/logout"]').should('be.visible').click();

        // Assert: Verificar se o logout redirecionou para a página de login
        cy.url().should('contain', '/login');
        cy.xpath('//h2[text()="Login to your account"]').should('be.visible');
    });
    
    it('Cadastrar Usuário com e-mail existente no sistema', () => {
        cy.xpath('//*[@data-qa="signup-name"]').type('Tiffany Grimes')
        cy.xpath('//*[@data-qa="signup-email"]').type('Jeanne38@yahoo.com')
        cy.xpath('//button[contains(.,"Signup")]').click()

        cy.xpath('//form[@action="/signup"]/p').should('contain', 'Email Address already exist!');
        
    });

    it('Enviar um formulario de contato com upload do arquivo', () => {
        // Arrange: Carrega os dados do formulário e navega para a página
        cy.xpath('//a[@href="/contact_us"]').click();
            
        cy.xpath('//*[@data-qa="name"]').type(userData.name);
        cy.xpath('//*[@data-qa="email"]').type(userData.email);
        cy.xpath('//*[@data-qa="subject"]').type(userData.subject);
        cy.xpath('//*[@data-qa="message"]').type(userData.body);    

        cy.fixture('example.json').as('arquivo') 
        cy.xpath('//input[@type="file"]').selectFile('@arquivo');

        // Act: Submeter o formulário
        cy.xpath('//*[@data-qa="submit-button"]').click();

        // Assert: Verificar a mensagem de sucesso
        cy.xpath('//*[@class="status alert alert-success"]').should('be.visible')
            .and('have.text', 'Success! Your details have been submitted successfully.');
      });
});