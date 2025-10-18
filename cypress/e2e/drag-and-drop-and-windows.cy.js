describe('Interações Diversas', () => {
    it('Deve abrir um link em uma nova aba e validar seu conteúdo', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        // Remove o atributo 'target' para forçar a abertura na mesma aba
        cy.contains('Click Here').invoke('removeAttr', 'target').click()

        // Valida o conteúdo da nova página
        cy.get('h3').should('have.text', 'New Window')
        cy.go('back')

        // Valida o conteúdo da página original
        cy.get('h3').should('have.text', 'Opening a new window')    
    })

    it('Deve arrastar o elemento A para o elemento B', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

        const dataTransfer = new DataTransfer();

        cy.contains('A').trigger('dragstart', {dataTransfer})
        cy.contains('B').trigger('drop', {dataTransfer})    
        
    });
})