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
        
}

export default new Menu()
