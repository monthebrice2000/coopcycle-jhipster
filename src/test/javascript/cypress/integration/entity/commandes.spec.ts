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

describe('Commandes e2e test', () => {
  const commandesPageUrl = '/commandes';
  const commandesPageUrlPattern = new RegExp('/commandes(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const commandesSample = {};

  let commandes: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/commandes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/commandes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/commandes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (commandes) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/commandes/${commandes.id}`,
      }).then(() => {
        commandes = undefined;
      });
    }
  });

  it('Commandes menu should load Commandes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('commandes');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Commandes').should('exist');
    cy.url().should('match', commandesPageUrlPattern);
  });

  describe('Commandes page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commandesPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Commandes page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/commandes/new$'));
        cy.getEntityCreateUpdateHeading('Commandes');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/commandes',
          body: commandesSample,
        }).then(({ body }) => {
          commandes = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/commandes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [commandes],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(commandesPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Commandes page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('commandes');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesPageUrlPattern);
      });

      it('edit button click should load edit Commandes page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Commandes');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesPageUrlPattern);
      });

      it('last delete button click should delete instance of Commandes', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('commandes').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesPageUrlPattern);

        commandes = undefined;
      });
    });
  });

  describe('new Commandes page', () => {
    beforeEach(() => {
      cy.visit(`${commandesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Commandes');
    });

    it('should create an instance of Commandes', () => {
      cy.get(`[data-cy="id"]`).type('634f748d-292b-41ae-820a-dac84c5cdbee').should('have.value', '634f748d-292b-41ae-820a-dac84c5cdbee');

      cy.get(`[data-cy="estPret"]`).should('not.be.checked');
      cy.get(`[data-cy="estPret"]`).click().should('be.checked');

      cy.get(`[data-cy="estPaye"]`).should('not.be.checked');
      cy.get(`[data-cy="estPaye"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        commandes = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', commandesPageUrlPattern);
    });
  });
});
