//describe -> suíte ou conjunto  de testes em um mesmo arquivo
// it -> um teste dentor de um bloco ou conjunto de testes
///<reference types="cypress" />

describe('Automation-exercise', () => {
    it('Cadastrar um usuário', () => {

        const timestamp = new Date().getTime()

        cy.visit('https://automationexercise.com/')

        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="signup-name"]').type('QA Tester')

        cy.get('[data-qa="signup-email"]').type(`qatestare-${timestamp}@teste.com`)

        cy.contains('button', 'Signup').click()


        //Para selecionar um elemento do tipo checkbox, podemos usar umas destas 2 opções
        //cy.get('#id_gender1').check()
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

        cy.get('[data-qa="create-account"]').click()

     });
});
