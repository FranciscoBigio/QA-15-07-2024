

describe('Transações', () => {

    beforeEach(() => {

        cy.visit("devfinance-agilizei.netlify.app/#")

    });
    it('Cadastrar uma entrada', () => {

        criarTransacao("Chico", 100)

        cy.get("tbody tr td.description")
        .should("have.text", "Chico")

    });
    it('Cadastrar uma saída', () => {

        criarTransacao("Ana Clara", -70)

        cy.get("tbody tr td.description")
        .should("have.text", "Ana Clara")

    });
    it('Excluir transação', () => {
        
        criarTransacao("Chico", 100)
        criarTransacao("Mesada", 10)
        criarTransacao("Contas", -700)

        cy.contains(".description", "Chico")
            .parent()
            .find('img')
            .click()

        cy.contains(".description", "Contas")
            .siblings()
            .children('img')
            .click()
            
        cy.get('tbody tr')
        .should("have.length", 1)

    });
});

function criarTransacao(descricao, valor) {

    cy.contains("Nova Transação")
    .click()

    cy.get('#description')
    .type(descricao)

    cy.get('#amount')
    .type(valor)

    cy.get('#date')
    .type("2024-07-22")

    cy.contains('button', "Salvar")
    .click()

}