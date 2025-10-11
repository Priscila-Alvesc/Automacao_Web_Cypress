// ***********************************************
import { faker } from '@faker-js/faker';
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Realiza o login na aplicação com um usuário e senha.
 * @param {string} email - O e-mail do usuário.
 * @param {string} password - A senha do usuário.
 */
Cypress.Commands.add('login', (email, password) => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.get('[data-qa="login-button"]').click();
});

/**
 * Preenche o formulário de contato com os dados de um usuário.
 * @param {object} userData - O objeto contendo os dados do usuário (name, email, subject, message).
 */
Cypress.Commands.add('fillContactForm', (userData) => {
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);
});

/**
 * Cria um usuário via API para pré-condição de testes.
 * @param {string} password - A senha para o novo usuário.
 */
Cypress.Commands.add('createUser', (password) => {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        title: 'Mr',
        birth_date: '20',
        birth_month: 'May',
        birth_year: '2010',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        country: 'New Zealand',
        zipcode: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        mobile_number: faker.phone.number()
    };

    cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/createAccount',
        form: true, // Simula o envio de um formulário HTML
        body: user,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        response.body.user = user; // Anexa os dados do usuário à resposta para uso no teste
    });
});