class Menu{
     navegarParaLogin(){
          cy.get('a[href="/login"]').click();
     }

     efetuarLogout(){
        cy.url().should('not.include', '/login');
        cy.get('i.fa-user').parent().should('contain', 'Logged in as');

        // Act: Fazer logout
        cy.get('a[href="/logout"]').should('be.visible').click();
     }

     pesquisarProduto(){
        cy.get('a[href="/products"]').click();
        cy.url().should('include', '/products');
        cy.get('.features_items').should('be.visible')
     }
        
}

export default new Menu()
