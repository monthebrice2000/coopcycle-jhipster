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

describe('Restaurateurs e2e test', () => {
  const restaurateursPageUrl = '/restaurateurs';
  const restaurateursPageUrlPattern = new RegExp('/restaurateurs(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const restaurateursSample = { nom: 'cardXXXXXX', prenom: 'EngineerXX' };

  let restaurateurs: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/restaurateurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/restaurateurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/restaurateurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (restaurateurs) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/restaurateurs/${restaurateurs.id}`,
      }).then(() => {
        restaurateurs = undefined;
      });
    }
  });

  it('Restaurateurs menu should load Restaurateurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('restaurateurs');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Restaurateurs').should('exist');
    cy.url().should('match', restaurateursPageUrlPattern);
  });

  describe('Restaurateurs page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(restaurateursPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Restaurateurs page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/restaurateurs/new$'));
        cy.getEntityCreateUpdateHeading('Restaurateurs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurateursPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/restaurateurs',
          body: restaurateursSample,
        }).then(({ body }) => {
          restaurateurs = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/restaurateurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [restaurateurs],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(restaurateursPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Restaurateurs page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('restaurateurs');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurateursPageUrlPattern);
      });

      it('edit button click should load edit Restaurateurs page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Restaurateurs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurateursPageUrlPattern);
      });

      it('last delete button click should delete instance of Restaurateurs', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('restaurateurs').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurateursPageUrlPattern);

        restaurateurs = undefined;
      });
    });
  });

  describe('new Restaurateurs page', () => {
    beforeEach(() => {
      cy.visit(`${restaurateursPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Restaurateurs');
    });

    it('should create an instance of Restaurateurs', () => {
      cy.get(`[data-cy="nom"]`).type('Island Steel sensor').should('have.value', 'Island Steel sensor');

      cy.get(`[data-cy="prenom"]`).type('Coordinator Handcrafted').should('have.value', 'Coordinator Handcrafted');

      cy.get(`[data-cy="city"]`).type('South Isaiah').should('have.value', 'South Isaiah');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        restaurateurs = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', restaurateursPageUrlPattern);
    });
  });
});
