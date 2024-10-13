describe('THKIT Website E2E Testing', () => {
    // Disable failure on uncaught exceptions to prevent Cypress from failing due to app-level issues
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception detected:', err);
        return false; // Prevent test failure
    });

    beforeEach(() => {
        cy.visit('https://martinkemppi22.thkit.ee/');
    });

    it('Verify Modal Forms Test With Pauses', () => {
        // Logi Sisse Button
        cy.get('#logisisse')
            .should('exist') // Ensure the element exists
            .and('be.visible') // Ensure it is visible
            .click(); // Click the button
        cy.url().should('include', '#modal_log');

        // Navigate back to home
        cy.visit('https://martinkemppi22.thkit.ee/');

        // Registreeri Button
        cy.get('#regimind')
            .should('exist') // Ensure the element exists
            .and('be.visible') // Ensure it's visible
            .click(); // Click the button
        cy.url().should('include', '#modal_reg');
    });

    it('Verify Redirection To Content Index Test', () => {
        // Navigate to tood.html
        cy.visit('https://martinkemppi22.thkit.ee/tood.html');

        // Find and click content link
        cy.get('a[href="content/index.php"]')
            .should('exist') // Ensure the link exists
            .and('be.visible') // Ensure it's visible
            .click(); // Click the link

        // Verify the redirection to content/index.php
        cy.url().should('eq', 'https://martinkemppi22.thkit.ee/content/index.php');
    });

    it('Interact With Muusika Kysitlus Test', () => {
        // Navigate to content/index.php
        cy.visit('https://martinkemppi22.thkit.ee/content/index.php');

        // Find and click 'Muusika küsitlus' element
        cy.contains('Muusika küsitlus')
            .should('exist') // Ensure the element exists
            .and('be.visible') // Ensure it's visible
            .click(); // Click the element

        // Verify redirection to expected URL
        cy.url().should('eq', 'https://martinkemppi22.thkit.ee/content/index.php?veebileht=muusikakysitlus.php');
    });

    it('Click Aknaruloode Tootmine and Verify Redirection', () => {
        // Navigate to content/index.php
        cy.visit('https://martinkemppi22.thkit.ee/content/index.php');

        // Override the window.open behavior to prevent opening a new tab
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                // Redirect to the new page in the same window
                win.location.href = url;
            });
        });

        // Find and click 'Aknaruloode tootmine'
        cy.contains('Aknaruloode tootmine')
            .should('exist') // Ensure the element exists
            .and('be.visible') // Ensure it's visible
            .click(); // Click the element

        // Verify the redirection to the new page
        cy.url().should('eq', 'https://martinkemppi22.thkit.ee/content/Aknarulood/index.php');
    });
});
