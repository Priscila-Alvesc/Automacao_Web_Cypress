import { faker } from '@faker-js/faker'

class Login {
    /**
     * Preenche o formulário de pré-cadastro (signup) com um nome e e-mail.
     * @param {string} email - O e-mail a ser usado no cadastro.
     */
    preencherFormularioPreCadastro(email){
        // Act: Iniciar o processo de cadastro
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName())
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDeLogin(user, pass){
        // Arrange: Navegar para a página de login e usar os dados do teste anterior
        cy.get('[data-qa="login-email"]').type(user);
        cy.get('[data-qa="login-password"]').type(pass, { log: false });

        // Act: Fazer login
        cy.get('[data-qa="login-button"]').click();
    }

}

export default new Login();