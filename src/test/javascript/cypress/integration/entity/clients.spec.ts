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

describe('Clients e2e test', () => {
  const clientsPageUrl = '/clients';
  const clientsPageUrlPattern = new RegExp('/clients(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const clientsSample = { nom: 'ConcreteXX', prenom: 'HomeXXXXXX', phoneNumber: 'District alarm Australia' };

  let clients: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/clients+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/clients').as('postEntityRequest');
    cy.intercept('DELETE', '/api/clients/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (clients) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/clients/${clients.id}`,
      }).then(() => {
        clients = undefined;
      });
    }
  });

  it('Clients menu should load Clients page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('clients');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Clients').should('exist');
    cy.url().should('match', clientsPageUrlPattern);
  });

  describe('Clients page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(clientsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Clients page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/clients/new$'));
        cy.getEntityCreateUpdateHeading('Clients');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/clients',
          body: clientsSample,
        }).then(({ body }) => {
          clients = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/clients+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [clients],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(clientsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Clients page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('clients');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientsPageUrlPattern);
      });

      it('edit button click should load edit Clients page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Clients');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientsPageUrlPattern);
      });

      it('last delete button click should delete instance of Clients', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('clients').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientsPageUrlPattern);

        clients = undefined;
      });
    });
  });

  describe('new Clients page', () => {
    beforeEach(() => {
      cy.visit(`${clientsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Clients');
    });

    it('should create an instance of Clients', () => {
      cy.get(`[data-cy="nom"]`).type('Puerto deposit Unbranded').should('have.value', 'Puerto deposit Unbranded');

      cy.get(`[data-cy="prenom"]`).type('e-business Brand RSS').should('have.value', 'e-business Brand RSS');

      cy.get(`[data-cy="email"]`).type('Gisselle_Kohler50@yahoo.com').should('have.value', 'Gisselle_Kohler50@yahoo.com');

      cy.get(`[data-cy="phoneNumber"]`).type('invoice Phased Usability').should('have.value', 'invoice Phased Usability');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        clients = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', clientsPageUrlPattern);
    });
  });
});
