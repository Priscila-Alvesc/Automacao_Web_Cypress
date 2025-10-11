class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click();
    }

    fazerLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click();
    }
}

export default new Menu();