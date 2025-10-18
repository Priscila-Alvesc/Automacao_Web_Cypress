import { faker } from '@faker-js/faker'


class Cadastro{
    preencherFormularioCadastroCompleto(password){
        cy.get('b').should('contain.text', 'Enter Account Information')
        cy.get('input[type="radio"]').check('Mr')

        cy.get('input#password').type(password, {log:false})
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
    }

     preencherFormularioDeLoginUserExistente(){
        cy.get('[data-qa="signup-name"]').type('Tiffany Grimes')
        cy.get('[data-qa="signup-email"]').type('Jeanne38@yahoo.com')
        cy.contains('button', 'Signup').click()


    }
}

export default new Cadastro();