/// <reference types="cypress" />

var Chance = require('chance')
var chance = new Chance()

describe('DevFinance', () => {
    before(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#')

    });

    beforeEach(() => {
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('Freela')
        cy.get('#amount').type(chance.integer({ min: -100, max: 100 }))
        cy.get('#date').type('2021-11-03')

        cy.contains('button', 'Salvar').click()

        cy.get('table tbody tr').should('have.length',1)
    });

    it('Excluir uma transação de entrada', () => {
        cy.get('td > img[onclick*=remove]').click()

        cy.get('table tbody tr').should('have.length',0)
        cy.get('p#totalDisplay').should('contain.text', '0,00')
    });
});

