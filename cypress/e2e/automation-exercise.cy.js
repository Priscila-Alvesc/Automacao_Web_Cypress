//describe -> suíte ou conjunto  de testes em um mesmo arquivo
// it -> um teste dentor de um bloco ou conjunto de testes
///<reference types="cypress" />
 
describe('Automation-exercise', () => {
    // Usamos 'let' para que as variáveis possam ser compartilhadas entre os testes no mesmo 'describe'
    let userEmail;
    let userPassword;

    beforeEach(() => {
        cy.viewport('iphone-xr');
        cy.visit('https://automationexercise.com/');
    });

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()
        userEmail = `qatester-${timestamp}@teste.com`;
        userPassword = '12345';

        // Act: Iniciar o processo de cadastro
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(userEmail)
        cy.get('[data-qa="signup-button"]').click()

        cy.get('b').should('contain.text', 'Enter Account Information')
        cy.get('input[type="radio"]').check('Mr')

        cy.get('input#password').type(userPassword, {log:false})

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

    it('Login de Usuário com e-mail e senha incorretos', () => {
       cy.get('a[href="/login"]').click();
       // Act: Tentar fazer login com credenciais inválidas
        cy.get('[data-qa="login-email"]').type('email-invalido@teste.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()

        // Assert: Verificar a mensagem de erro (encadeando as assertivas)
        cy.get('.login-form > form > p')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
            .and('contain', 'Your email or password is incorrect!');
                
    });  

    it('Login de Usuário com e-mail e senha válido e Logout', () => {
        // Arrange: Navegar para a página de login e usar os dados do teste anterior
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(userEmail);
        cy.get('[data-qa="login-password"]').type(userPassword);

        // Act: Fazer login
        cy.get('[data-qa="login-button"]').click();

        // Assert: Verificar se o login foi bem-sucedido
        cy.url().should('not.include', '/login');
        cy.get('i.fa-user').parent().should('contain', 'Logged in as');

        // Act: Fazer logout
        cy.get('a[href="/logout"]').should('be.visible').click();

        // Assert: Verificar se o logout redirecionou para a página de login
        cy.url().should('include', '/login');
        cy.contains('Login to your account').should('be.visible');
    });

});