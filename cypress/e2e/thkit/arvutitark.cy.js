describe('Automate adding products to cart and completing order', () => {
    const productLinks = [
        'https://arvutitark.ee/arvutikomponendid/emaplaadid/gigabyte-z890-ud-wifi6e-mainboard-sockel-lga-1851-intel-z8-1409511',
        'https://arvutitark.ee/arvutikomponendid/graafikakaardid-vga/msi-geforce-rtx-4080-super-ventus-3x-oc-16gb-1350096',
        'https://arvutitark.ee/arvutikomponendid/malud-ram/ddr5-fury-beast-black-64gb232gb5200-cl40-1128136',
        'https://arvutitark.ee/arvutikomponendid/andmekandjad/pooljuhtkettad-ssd/kingston-fury-renegade-2000gb-m2-pcie-1110218',
        'https://arvutitark.ee/arvutikomponendid/toiteplokid-psu/modular-power-supply-ud1000gm-1000w-80plus-gold-atx-1128417',
        'https://arvutitark.ee/arvutikomponendid/korpused/cougar-i-archon-2-mesh-rgb-black-i-385cc500001-i-case-i-min-1269420',
        'https://arvutitark.ee/arvutikomponendid/jahutid/protsessori-jahutid/peerless-assassin-120-mini-must-1397924',
        'https://arvutitark.ee/arvutid-ja-lisad/monitorid/lg-monitor-27gs60f-b-27-cali-fhd-ultragear-ips-180hz-1ms-1388632',
        'https://arvutitark.ee/arvutid-ja-lisad/heliseadmed/korvaklapid/logi-pro-x-wireless-lightspeed-headset-1372918',
        'https://arvutitark.ee/arvutid-ja-lisad/lisaseadmed/klaviatuurid/logi-g512-carbon-red-pan-1109952'
    ];

    const PO = [
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/norton-360-mobile-esd-powerful-protection-for-mobile-1-1400935',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/norton-antivirus-plus-esd-multiple-layers-of-protection-1400934',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/norton-360-standard-esd-multiple-layers-of-protection-fo-1400932',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/kaspersky-anti-virus-1-pc-1-year-renew-box-1401197',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/kaspersky-anti-virus-1-pc-1-year-uus-e-license-1357222',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/norton-360-deluxe-esd-multiple-layers-of-protection-for-1400938',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/microsoft-qq2-00012-office-365-personal-esd-license-term-1-1024284',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/sw-ret-microsoft-365-personaleng-1y-qq2-01897-ms-1322932',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/oem-windows-11-home-pl-x64-dvd-kw9-0064-1088039',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/ms-win-11-pro-mui-esd-1139855',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/software-lic-surveillancestation-pack8-device-synology-1021690',
        'https://arvutitark.ee/arvutid-ja-lisad/tarkvara/windows-server-2022standard-rok16core-for-distributor-sa-1132036',
        'https://arvutitark.ee/arvutid-ja-lisad/printerid-ja-skannerid/printerid/epson-workforce-enterprise-am-c5000-1315787',
        'https://arvutitark.ee/arvutid-ja-lisad/printerid-ja-skannerid/printerid/epson-multifunctional-printer-ecotank-l6570-colour-inkjet-1040847',
        'https://arvutitark.ee/arvutid-ja-lisad/printerid-ja-skannerid/skannerid/kodak-scanner-i4250-a3-dokumentenscanner-1172435',
        'https://arvutitark.ee/vorguseadmed/ruuterid/gt-axe16000-router-wifi-6e-2xwan-10gb-1156739',
        'https://arvutitark.ee/nutiseadmed/telefonid/mobile-phone-iphone-16-pro-max1tb-white-titan-myx53-apple-1408632'
    ]

    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    it('Adds products to cart and completes the order', () => {
        productLinks.forEach(link => {
            cy.visit(link);
            cy.contains('Lisa ostukorvi').click();
            cy.wait(2000);
        });

        const randomIndex = Math.floor(Math.random() * PO.length);
        const randomLink = PO[randomIndex];
        cy.visit(randomLink);
        cy.contains('Lisa ostukorvi').click();
        cy.wait(2000);

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