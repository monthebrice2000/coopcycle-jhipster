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

describe('Cooperatives e2e test', () => {
  const cooperativesPageUrl = '/cooperatives';
  const cooperativesPageUrlPattern = new RegExp('/cooperatives(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const cooperativesSample = { nom: 'ClothingXX' };

  let cooperatives: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/cooperatives+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/cooperatives').as('postEntityRequest');
    cy.intercept('DELETE', '/api/cooperatives/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (cooperatives) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/cooperatives/${cooperatives.id}`,
      }).then(() => {
        cooperatives = undefined;
      });
    }
  });

  it('Cooperatives menu should load Cooperatives page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('cooperatives');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Cooperatives').should('exist');
    cy.url().should('match', cooperativesPageUrlPattern);
  });

  describe('Cooperatives page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(cooperativesPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Cooperatives page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/cooperatives/new$'));
        cy.getEntityCreateUpdateHeading('Cooperatives');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', cooperativesPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/cooperatives',
          body: cooperativesSample,
        }).then(({ body }) => {
          cooperatives = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/cooperatives+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [cooperatives],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(cooperativesPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Cooperatives page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('cooperatives');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', cooperativesPageUrlPattern);
      });

      it('edit button click should load edit Cooperatives page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Cooperatives');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', cooperativesPageUrlPattern);
      });

      it('last delete button click should delete instance of Cooperatives', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('cooperatives').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', cooperativesPageUrlPattern);

        cooperatives = undefined;
      });
    });
  });

  describe('new Cooperatives page', () => {
    beforeEach(() => {
      cy.visit(`${cooperativesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Cooperatives');
    });

    it('should create an instance of Cooperatives', () => {
      cy.get(`[data-cy="nom"]`).type('generation South Lights').should('have.value', 'generation South Lights');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        cooperatives = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', cooperativesPageUrlPattern);
    });
  });
});
