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

describe('Livreurs e2e test', () => {
  const livreursPageUrl = '/livreurs';
  const livreursPageUrlPattern = new RegExp('/livreurs(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const livreursSample = { nom: 'Forge Italy', prenom: 'teal AvonX', city: 'West Bradleyton' };

  let livreurs: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/livreurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/livreurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/livreurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (livreurs) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/livreurs/${livreurs.id}`,
      }).then(() => {
        livreurs = undefined;
      });
    }
  });

  it('Livreurs menu should load Livreurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('livreurs');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Livreurs').should('exist');
    cy.url().should('match', livreursPageUrlPattern);
  });

  describe('Livreurs page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(livreursPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Livreurs page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/livreurs/new$'));
        cy.getEntityCreateUpdateHeading('Livreurs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', livreursPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/livreurs',
          body: livreursSample,
        }).then(({ body }) => {
          livreurs = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/livreurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [livreurs],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(livreursPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Livreurs page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('livreurs');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', livreursPageUrlPattern);
      });

      it('edit button click should load edit Livreurs page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Livreurs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', livreursPageUrlPattern);
      });

      it('last delete button click should delete instance of Livreurs', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('livreurs').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', livreursPageUrlPattern);

        livreurs = undefined;
      });
    });
  });

  describe('new Livreurs page', () => {
    beforeEach(() => {
      cy.visit(`${livreursPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Livreurs');
    });

    it('should create an instance of Livreurs', () => {
      cy.get(`[data-cy="nom"]`).type('reinvent Pants Shirt').should('have.value', 'reinvent Pants Shirt');

      cy.get(`[data-cy="prenom"]`).type('EngineerXX').should('have.value', 'EngineerXX');

      cy.get(`[data-cy="city"]`).type('New Drewville').should('have.value', 'New Drewville');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        livreurs = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', livreursPageUrlPattern);
    });
  });
});
