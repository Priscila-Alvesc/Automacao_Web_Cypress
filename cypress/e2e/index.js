class Contact {
    /**
     * Navega para a página de "Contact Us".
     */
    navegarParaContato() {
        cy.get('a[href="/contact_us"]').click();
    }

    /**
     * Preenche os campos do formulário de contato.
     * @param {object} contactData - Objeto com os dados (name, email, subject, body).
     */
    preencherFormulario(contactData) {
        cy.get('[data-qa=name]').type(contactData.name);
        cy.get('[data-qa=email]').type(contactData.email);
        cy.get('[data-qa=subject]').type(contactData.subject);
        cy.get('[data-qa=message]').type(contactData.body);
    }

    /**
     * Anexa um arquivo ao formulário.
     * @param {string} fixturePath - O caminho para o arquivo na pasta fixtures.
     */
    anexarArquivo(fixturePath) {
        cy.get('input[type=file]').selectFile(fixturePath);
    }
}

export default new Contact();