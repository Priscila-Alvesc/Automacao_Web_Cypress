/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
import userData from '../fixtures/example.json'
import { getPass } from '../support/helpers'

describe('Automation-exercise', () => {
    let userEmail
    let userPassword

    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('body').should('be.visible')
        cy.get('a[href="/login"]').click()
    })

    it('Cadastrar um usuário', () => {
        userEmail = faker.internet.email()
        userPassword = getPass()

        // Iniciar o processo de cadastro
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName())
        cy.get('[data-qa="signup-email"]').type(userEmail)
        cy.contains('button', 'Signup').click()

        cy.get('b').should('contain.text', 'Enter Account Information')
        cy.get('input[type="radio"]').check('Mr')

        cy.get('input#password').type(userPassword, { log: false })
        const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
        cy.get('select[data-qa="days"]').select(birthDate.getDate().toString())
        cy.get('select[data-qa="months"]').select(birthDate.toLocaleString('en-US', { month: 'long' }))
        cy.get('select[data-qa="years"]').select(birthDate.getFullYear().toString())

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

        // Criar a conta
        cy.get('[data-qa="create-account"]').click()

        // Verificar se a conta foi criada com sucesso
        cy.url().should('includes', 'account_created')
        cy.get('b').should('have.text', 'Account Created!')
    })

    it('Login de Usuário com e-mail e senha válidos', () => {
        cy.get('[data-qa="login-email"]').type(userEmail)
        cy.get('[data-qa="login-password"]').type(userPassword)

        cy.get('[data-qa="login-button"]').click()

        cy.url().should('not.include', '/login')
        cy.get('i.fa-user').parent().should('contain', 'Logged in as')
        cy.get('a[href="/logout"]').should('be.visible')
    })

    it('Login de Usuário com e-mail e senha incorretos', () => {
        cy.get('[data-qa="login-email"]').type('email-invalido@teste.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
        cy.url().should('include', '/login')
    })

    it('Logout de Usuário', () => {
        cy.get('[data-qa="login-email"]').type(userEmail)
        cy.get('[data-qa="login-password"]').type(userPassword)

        cy.get('[data-qa="login-button"]').click()

        cy.url().should('not.include', '/login')
        cy.get('i.fa-user').parent().should('contain', 'Logged in as')

        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', '/login')
        cy.contains('Login to your account').should('be.visible')
    })

    it('Cadastrar Usuário com e-mail existente no sistema', () => {
        cy.get('[data-qa="signup-name"]').type('Tiffany Grimes')
        cy.get('[data-qa="signup-email"]').type('Jeanne38@yahoo.com')
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    })

    it('Enviar um formulario de contato com upload do arquivo', () => {
        cy.get('a[href="/contact_us"]').click()

        cy.get('[data-qa=name]').type(userData.name)
        cy.get('[data-qa=email]').type(userData.email)
        cy.get('[data-qa=subject]').type(userData.subject)
        cy.get('[data-qa=message]').type(userData.body)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status.alert-success').should('be.visible')
            .and('have.text', 'Success! Your details have been submitted successfully.')
    })

    it('Verificar produtos na página de produtos', () => {
        cy.get('a[href="/products"]').click()

        cy.url().should('include', '/products')

        cy.get('.features_items').should('be.visible')
        cy.get('.features_items .product-image-wrapper').should('have.length', 34)

        cy.get('.features_items .product-image-wrapper').first().contains('View Product').click()
        cy.url().should('include', '/product_details/1')

        cy.get('.product-information').should('be.visible').within(() => {
            cy.get('h2').should('have.text', 'Blue Top')
            cy.contains('p', 'Category:').should('be.visible')
            cy.get('span').contains('Rs. 500').should('be.visible')
            cy.contains('p', 'Availability:').should('contain.text', 'In Stock')
            cy.contains('p', 'Condition:').should('contain.text', 'New')
            cy.contains('p', 'Brand:').should('contain.text', 'Polo')
        })
    })

    it('Deve buscar por um produto e verificar o resultado', () => {
        cy.get('a[href="/products"]').click()
        cy.url().should('include', '/products')

        cy.get('#search_product').type('blue top')
        cy.get('#submit_search').click()
        cy.get('.features_items .product-image-wrapper').should('have.length', 1)
        cy.url().should('include', '/products?search=blue%20top')

        cy.get('.features_items').within(() => {
            cy.get('.title').should('have.text', 'Searched Products')
            cy.get('.productinfo img').should('be.visible')
            cy.get('.productinfo p').should('contain.text', 'Blue Top')
        })
    })

    it('Verifique a assinatura na página inicial', () => {
        cy.get('.single-widget > h2').should('be.visible').and('have.text', 'Subscription')
        cy.get('#susbscribe_email').type(faker.internet.email())
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('be.visible').and('contain.text', 'You have been successfully subscribed!')
    })

    it('Pedido: Cadastre-se antes de Finalizar a Compra', () => {
        userEmail = faker.internet.email()
        userPassword = getPass()

        // Iniciar o processo de cadastro
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName())
        cy.get('[data-qa="signup-email"]').type(userEmail)
        cy.contains('button', 'Signup').click()

        cy.get('b').should('contain.text', 'Enter Account Information')
        cy.get('input[type="radio"]').check('Mr')

        cy.get('input#password').type(userPassword, { log: false })
        const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
        cy.get('select[data-qa="days"]').select(birthDate.getDate().toString())
        cy.get('select[data-qa="months"]').select(birthDate.toLocaleString('en-US', { month: 'long' }))
        cy.get('select[data-qa="years"]').select(birthDate.getFullYear().toString())

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

        // Criar a conta
        cy.get('[data-qa="create-account"]').click()

        // Verificar se a conta foi criada com sucesso
        cy.url().should('includes', 'account_created')
        cy.get('b').should('have.text', 'Account Created!')


        // Adicionar produto ao carrinho
        cy.get('a[href="/products"]').click()
        cy.get('.features_items .product-image-wrapper').first().within(() => {
            cy.contains('a', 'Add to cart').click({ force: true })
        })

        cy.get('div#cartModal').then(($modal) => {
            if ($modal.length && $modal.is(':visible')) {
                cy.wrap($modal).contains('a', 'View Cart').click({ force: true })
            } else {
                cy.get('a[href="/view_cart"]').first().click({ force: true })
            }
        })

        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')

        cy.contains('a', 'Proceed To Checkout').click()
        cy.url({ timeout: 10000 }).should('include', '/checkout')

        cy.get('body', { timeout: 10000 }).then(($body) => {
            if ($body.find('.checkout-address').length) {
                cy.get('.checkout-address').should('exist')
            } else if ($body.find('a').filter((i, el) => el.innerText.includes('Place Order')).length) {
                cy.log('Place Order link found — continuing')
            } else {
                cy.get('input[name="name_on_card"]', { timeout: 10000 }).should('exist')
            }
        })

        cy.get('textarea[name="message"]').type('É um presente!')
        cy.contains('a', 'Place Order').click()

        cy.get('input[name="name_on_card"]').type('Test User')
        cy.get('input[name="card_number"]').type('4242424242424242')
        cy.get('input[name="cvc"]').type('123')
        cy.get('input[name="expiry_month"]').type('12')
        cy.get('input[name="expiry_year"]').type('2026')

        cy.contains('button', 'Pay and Confirm Order').click()

        cy.get('body', { timeout: 10000 }).then(($body) => {
            const text = $body.text()
            if (text.includes('Your order has been placed successfully') || text.includes('Congratulations! Your order has been confirmed')) {
                cy.log('Order success message found')
            } else {
                throw new Error('Order success message not found on page')
            }
        })

        cy.contains('a', 'Delete Account').click()
        cy.get('b').should('have.text', 'Account Deleted!')
        cy.contains('a', 'Continue').click()
    })
})