//describe -> suíte ou conjunto  de testes em um mesmo arquivo
// it -> um teste dentor de um bloco ou conjunto de testes
///<reference types="cypress" />

describe('Automation-exercise', () => {
    it('Cadastrar um usuário', () => {

        const timestamp = new Date().getTime()

        // Arrange: Visitar a página e navegar para o login
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()

        // Act: Iniciar o processo de cadastro
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qatester-${timestamp}@teste.com`)
        cy.get('[data-qa="signup-button"]').click()

        // Act: Preencher o formulário de informações da conta
        cy.get('b').should('contain.text', 'Enter Account Information')
        cy.get('input[type="radio"]').check('Mr')

        cy.get('input#password').type('12345', {log:false})

        //para comboboxes ou selects - select
        cy.get('select[data-qa="days"]').select('20')
        cy.get('select[data-qa="months"]').select('May')
        cy.get('select[data-qa="years"]').select('2010')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('Joao')
        cy.get('input#last_name').type('Silva QA')
        cy.get('input#company').type('QAs Company')
        cy.get('input#address1').type('Rua Eucaliptos, Nº 1')
        cy.get('input#address2').type('Rua Flores, Nº 4')
        cy.get('select#country').select('New Zealand')
        cy.get('input#state').type('Taranaki')
        cy.get('input#city').type('New Plymouth') 
        cy.get('[data-qa="zipcode"]').type('4310')
        cy.get('[data-qa="mobile_number"]').type('+64 1234 5678')

        // Act: Criar a conta
        cy.get('[data-qa="create-account"]').click()

        // Assert: Verificar se a conta foi criada com sucesso
        cy.url().should('includes', 'account_created')
        cy.get('b').should('have.text', 'Account Created!')

     });
});
