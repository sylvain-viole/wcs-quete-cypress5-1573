/// <reference types="cypress" />

import IndexPage from "../POM/IndexPage"
import BoutiquesPage from "../POM/BoutiquesPage"
const data = require('../fixtures/data.json')
const indexPage = new IndexPage()
const boutiquesPage = new BoutiquesPage()

describe("Add product to cart form home page", () => {
    before(() => {
        cy.visit("https://www.mavillemonshopping.fr/fr");
        cy.setCookie("policy_rule_cookie", "accepted").should('have.property', 'value', 'accepted');
    });

    it("should type an address", () => {
        cy.get(indexPage.searchAddressInput)
            .type(data.address)
            .should("have.value", data.address);
        cy.intercept(
            "GET",
            `https://www.mavillemonshopping.fr/addresses/search?input=${data.address}`
            ).as('addressSearch')
            cy.wait('@addressSearch');
        cy.get(indexPage.addressResultUl).should('be.visible')
            .children('li').eq(0).should('contain.text', data.address)
            .click()
        cy.get(indexPage.searchAddressInput).type("{enter}");
    });

    it("should be redirected to boutique page", () => {
        cy.url().should('eq', data.expected.boutiqueUrl)
    })

    it('Page should have correct address and title', () => {
        cy.get(boutiquesPage.addressBtn).should("contain.text", data.address);
        cy.get('h2').eq(0).should('have.text', data.expected.titleCity);
    })

    after(() => {
    })


});
