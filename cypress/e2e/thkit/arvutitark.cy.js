describe('Automate collecting product links from the campaign page', () => {
    const campaignUrl = 'https://arvutitark.ee/kampaania-tooted?page=1';
    const productsToSelect = 10;
    const productLinks = [];
    const SHORT_WAIT = 2000;
    const max = 40;

    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    it('Clicks on random product images to collect links', () => {
        cy.visit(campaignUrl);
        cy.wait(SHORT_WAIT);

        for (let i = 1; i <= productsToSelect; i++) {
            const randomIndex = Math.floor(Math.random() * max) + 1;

            cy.get(`:nth-child(${randomIndex}) > .catalogue-product-link > .catalogue-product > ._image-wrapper > img`)
                .click();

            cy.url().then(currentUrl => {
                productLinks.push(currentUrl);
            });

            cy.visit(campaignUrl);
            cy.wait(SHORT_WAIT);
        }

        cy.log('Collected Product Links:', productLinks);

        cy.wrap(productLinks).each(link => {
            cy.visit(link);
            cy.contains('Lisa ostukorvi').click();
            cy.wait(SHORT_WAIT);
        });

        cy.visit('https://arvutitark.ee/ostukorv');
        cy.wait(10000);

        cy.contains('Ostan külalisena').click();

        cy.wait(5000);

        cy.scrollTo('bottom');

        cy.get('input[name="billing.firstName"]').type('test');
        cy.get('input[name="billing.lastName"]').type('test');
        cy.get('input[name="billing.phone"]').type('12345678');
        cy.get('input[name="billing.email"]').type('test@gmail.com');

        cy.get('span.check').first().click();

        cy.scrollTo('top');
        cy.contains('Arvutitark esindus').click();

        cy.wait(5000);

        cy.contains('Järveotsa tee 50c, 13520 Tallinn').click();

        cy.wait(2000);

        cy.contains('span', 'Nõustun Arvutitark OÜ e-poe').parent().find('input[type="checkbox"]').check({ force: true });

        cy.scrollTo('bottom');
        cy.contains('Vormistan tellimuse').click();
    });
});