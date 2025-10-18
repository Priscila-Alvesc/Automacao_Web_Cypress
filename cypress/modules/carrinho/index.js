class Carrinho {
    addFirstProductToCart() {
        // Navega para produtos e adiciona o primeiro item
        cy.get('a[href="/products"]').click()
        cy.get('.features_items .product-image-wrapper').first().within(() => {
            cy.contains('a', 'Add to cart').click({ force: true })
        })
    }

    openCartFromModalOrHeader() {
        // Ao aparecer modal de produto adicionado, usar o View Cart do modal;
        // caso contrário, usar o link de cabeçalho
        cy.get('div#cartModal').then(($modal) => {
            if ($modal.length && $modal.is(':visible')) {
                cy.wrap($modal).contains('a', 'View Cart').click({ force: true })
            } else {
                cy.get('a[href="/view_cart"]').first().click({ force: true })
            }
        })
    }

    verifyCartPage() {
        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')
    }

    proceedToCheckout() {
        cy.contains('a', 'Proceed To Checkout').click()
        cy.url({ timeout: 10000 }).should('include', '/checkout')
    }

    ensureCheckoutReady() {
        // Verifica sinais de que a página de checkout está pronta
        cy.get('body', { timeout: 10000 }).then(($body) => {
            if ($body.find('.checkout-address').length) {
                cy.get('.checkout-address').should('exist')
            } else if ($body.find('a').filter((i, el) => el.innerText.includes('Place Order')).length) {
                cy.log('Place Order link found — continuing')
            } else {
                cy.get('input[name="name_on_card"]', { timeout: 10000 }).should('exist')
            }
        })
    }

    placeOrderAndPay({ message = 'Por favor, entregue entre 9h e 18h',
                       name_on_card = 'Test User',
                       card_number = '4242424242424242',
                       cvc = '123',
                       expiry_month = '12',
                       expiry_year = '2026' } = {}) {
        cy.get('textarea[name="message"]').type(message)
        cy.contains('a', 'Place Order').click()

        cy.get('input[name="name_on_card"]').type(name_on_card)
        cy.get('input[name="card_number"]').type(card_number)
        cy.get('input[name="cvc"]').type(cvc)
        cy.get('input[name="expiry_month"]').type(expiry_month)
        cy.get('input[name="expiry_year"]').type(expiry_year)

        cy.contains('button', 'Pay and Confirm Order').click()

        // Validar mensagem de sucesso do pedido
        cy.get('body', { timeout: 10000 }).then(($body) => {
            const text = $body.text()
            if (text.includes('Your order has been placed successfully') || text.includes('Congratulations! Your order has been confirmed')) {
                cy.log('Order success message found')
            } else {
                throw new Error('Order success message not found on page')
            }
        })
    }

    deleteAccount() {
        cy.contains('a', 'Delete Account').click()
        cy.get('b').should('have.text', 'Account Deleted!')
        cy.contains('a', 'Continue').click()
    }
}

export default new Carrinho()
