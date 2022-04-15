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

describe('Restaurants e2e test', () => {
  const restaurantsPageUrl = '/restaurants';
  const restaurantsPageUrlPattern = new RegExp('/restaurants(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const restaurantsSample = { nom: 'Plastic bus', carte: 'Intelligent Rustic index' };

  let restaurants: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/restaurants+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/restaurants').as('postEntityRequest');
    cy.intercept('DELETE', '/api/restaurants/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (restaurants) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/restaurants/${restaurants.id}`,
      }).then(() => {
        restaurants = undefined;
      });
    }
  });

  it('Restaurants menu should load Restaurants page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('restaurants');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Restaurants').should('exist');
    cy.url().should('match', restaurantsPageUrlPattern);
  });

  describe('Restaurants page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(restaurantsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Restaurants page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/restaurants/new$'));
        cy.getEntityCreateUpdateHeading('Restaurants');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/restaurants',
          body: restaurantsSample,
        }).then(({ body }) => {
          restaurants = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/restaurants+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [restaurants],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(restaurantsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Restaurants page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('restaurants');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantsPageUrlPattern);
      });

      it('edit button click should load edit Restaurants page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Restaurants');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantsPageUrlPattern);
      });

      it('last delete button click should delete instance of Restaurants', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('restaurants').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantsPageUrlPattern);

        restaurants = undefined;
      });
    });
  });

  describe('new Restaurants page', () => {
    beforeEach(() => {
      cy.visit(`${restaurantsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Restaurants');
    });

    it('should create an instance of Restaurants', () => {
      cy.get(`[data-cy="nom"]`).type('Automotive').should('have.value', 'Automotive');

      cy.get(`[data-cy="carte"]`).type('Kwacha parse').should('have.value', 'Kwacha parse');

      cy.get(`[data-cy="menu"]`).type('Intelligent bricks-and-clicks').should('have.value', 'Intelligent bricks-and-clicks');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        restaurants = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', restaurantsPageUrlPattern);
    });
  });
});
