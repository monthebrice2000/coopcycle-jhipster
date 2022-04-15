import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Zones e2e test', () => {
  const zonesPageUrl = '/zones';
  const zonesPageUrlPattern = new RegExp('/zones(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const zonesSample = { ville: 'invoice Islands' };

  let zones: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/zones+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/zones').as('postEntityRequest');
    cy.intercept('DELETE', '/api/zones/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (zones) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/zones/${zones.id}`,
      }).then(() => {
        zones = undefined;
      });
    }
  });

  it('Zones menu should load Zones page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('zones');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Zones').should('exist');
    cy.url().should('match', zonesPageUrlPattern);
  });

  describe('Zones page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(zonesPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Zones page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/zones/new$'));
        cy.getEntityCreateUpdateHeading('Zones');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', zonesPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/zones',
          body: zonesSample,
        }).then(({ body }) => {
          zones = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/zones+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [zones],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(zonesPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Zones page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('zones');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', zonesPageUrlPattern);
      });

      it('edit button click should load edit Zones page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Zones');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', zonesPageUrlPattern);
      });

      it('last delete button click should delete instance of Zones', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('zones').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', zonesPageUrlPattern);

        zones = undefined;
      });
    });
  });

  describe('new Zones page', () => {
    beforeEach(() => {
      cy.visit(`${zonesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Zones');
    });

    it('should create an instance of Zones', () => {
      cy.get(`[data-cy="ville"]`).type('Dollar Business-focused').should('have.value', 'Dollar Business-focused');

      cy.get(`[data-cy="metropole"]`).type('end-to-end grow').should('have.value', 'end-to-end grow');

      cy.get(`[data-cy="communaute"]`).type('Granite embrace').should('have.value', 'Granite embrace');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        zones = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', zonesPageUrlPattern);
    });
  });
});
