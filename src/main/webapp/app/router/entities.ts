import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Zones = () => import('@/entities/zones/zones.vue');
// prettier-ignore
const ZonesUpdate = () => import('@/entities/zones/zones-update.vue');
// prettier-ignore
const ZonesDetails = () => import('@/entities/zones/zones-details.vue');
// prettier-ignore
const Cooperatives = () => import('@/entities/cooperatives/cooperatives.vue');
// prettier-ignore
const CooperativesUpdate = () => import('@/entities/cooperatives/cooperatives-update.vue');
// prettier-ignore
const CooperativesDetails = () => import('@/entities/cooperatives/cooperatives-details.vue');
// prettier-ignore
const Livreurs = () => import('@/entities/livreurs/livreurs.vue');
// prettier-ignore
const LivreursUpdate = () => import('@/entities/livreurs/livreurs-update.vue');
// prettier-ignore
const LivreursDetails = () => import('@/entities/livreurs/livreurs-details.vue');
// prettier-ignore
const Restaurateurs = () => import('@/entities/restaurateurs/restaurateurs.vue');
// prettier-ignore
const RestaurateursUpdate = () => import('@/entities/restaurateurs/restaurateurs-update.vue');
// prettier-ignore
const RestaurateursDetails = () => import('@/entities/restaurateurs/restaurateurs-details.vue');
// prettier-ignore
const Restaurants = () => import('@/entities/restaurants/restaurants.vue');
// prettier-ignore
const RestaurantsUpdate = () => import('@/entities/restaurants/restaurants-update.vue');
// prettier-ignore
const RestaurantsDetails = () => import('@/entities/restaurants/restaurants-details.vue');
// prettier-ignore
const Clients = () => import('@/entities/clients/clients.vue');
// prettier-ignore
const ClientsUpdate = () => import('@/entities/clients/clients-update.vue');
// prettier-ignore
const ClientsDetails = () => import('@/entities/clients/clients-details.vue');
// prettier-ignore
const Commandes = () => import('@/entities/commandes/commandes.vue');
// prettier-ignore
const CommandesUpdate = () => import('@/entities/commandes/commandes-update.vue');
// prettier-ignore
const CommandesDetails = () => import('@/entities/commandes/commandes-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'zones',
      name: 'Zones',
      component: Zones,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zones/new',
      name: 'ZonesCreate',
      component: ZonesUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zones/:zonesId/edit',
      name: 'ZonesEdit',
      component: ZonesUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zones/:zonesId/view',
      name: 'ZonesView',
      component: ZonesDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperatives',
      name: 'Cooperatives',
      component: Cooperatives,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperatives/new',
      name: 'CooperativesCreate',
      component: CooperativesUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperatives/:cooperativesId/edit',
      name: 'CooperativesEdit',
      component: CooperativesUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperatives/:cooperativesId/view',
      name: 'CooperativesView',
      component: CooperativesDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreurs',
      name: 'Livreurs',
      component: Livreurs,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreurs/new',
      name: 'LivreursCreate',
      component: LivreursUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreurs/:livreursId/edit',
      name: 'LivreursEdit',
      component: LivreursUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreurs/:livreursId/view',
      name: 'LivreursView',
      component: LivreursDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurateurs',
      name: 'Restaurateurs',
      component: Restaurateurs,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurateurs/new',
      name: 'RestaurateursCreate',
      component: RestaurateursUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurateurs/:restaurateursId/edit',
      name: 'RestaurateursEdit',
      component: RestaurateursUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurateurs/:restaurateursId/view',
      name: 'RestaurateursView',
      component: RestaurateursDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurants',
      name: 'Restaurants',
      component: Restaurants,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurants/new',
      name: 'RestaurantsCreate',
      component: RestaurantsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurants/:restaurantsId/edit',
      name: 'RestaurantsEdit',
      component: RestaurantsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurants/:restaurantsId/view',
      name: 'RestaurantsView',
      component: RestaurantsDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clients',
      name: 'Clients',
      component: Clients,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clients/new',
      name: 'ClientsCreate',
      component: ClientsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clients/:clientsId/edit',
      name: 'ClientsEdit',
      component: ClientsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clients/:clientsId/view',
      name: 'ClientsView',
      component: ClientsDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commandes',
      name: 'Commandes',
      component: Commandes,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commandes/new',
      name: 'CommandesCreate',
      component: CommandesUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commandes/:commandesId/edit',
      name: 'CommandesEdit',
      component: CommandesUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commandes/:commandesId/view',
      name: 'CommandesView',
      component: CommandesDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
