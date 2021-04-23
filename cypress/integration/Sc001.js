/// <reference types="cypress" />

import IndexPage from "../POM/IndexPage"
import BoutiquesPage from "../POM/BoutiquesPage"

const addContext = require('mochawesome/addContext.js')

const data = require('../fixtures/data.json')
const indexPage = new IndexPage()
const boutiquesPage = new BoutiquesPage()

describe("[Sc001] from homepage to Boutiques page", () => {

    
    before(() => {
        addContext(this, 'TEST STRING');
        cy.visit("/");
        cy.setCookie("policy_rule_cookie", "accepted").should('have.property', 'value', 'accepted');
    });

    it("[St001] Should input an address", () => {
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
        cy.screenshot("[St001]", {capture: 'viewport'});
        cy.get(indexPage.searchAddressInput).type("{enter}");
    });

    it("[St002] Should be redirected to boutique page", () => {
        cy.url().should("eq", data.expected.boutiqueUrl);
    });

    it("[St003] Page should have expected address and title", () => {
        cy.get(boutiquesPage.addressBtn).should("contain.text", data.address);
        cy.get("h2").eq(0).should("have.text", data.expected.titleCity);
        cy.screenshot("[St003]", {capture: 'viewport'});
    });

    afterEach(() => {
        addContext(this, "cypress/screenshots/Sc001.js/[St001].png");
    })


});
