//describe -> suíte ou conjunto  de testes em um mesmo arquivo
// it -> um teste dentor de um bloco ou conjunto de testes

describe('Automation-exercise', () => {
    it('Cadastrar um usuário', () => {
        cy.visit('https://automationexercise.com/')

        cy.get('a[href="/login"]').click()
        
    });
});