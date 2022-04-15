import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ZonesService from './zones/zones.service';
import CooperativesService from './cooperatives/cooperatives.service';
import LivreursService from './livreurs/livreurs.service';
import RestaurateursService from './restaurateurs/restaurateurs.service';
import RestaurantsService from './restaurants/restaurants.service';
import ClientsService from './clients/clients.service';
import CommandesService from './commandes/commandes.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('zonesService') private zonesService = () => new ZonesService();
  @Provide('cooperativesService') private cooperativesService = () => new CooperativesService();
  @Provide('livreursService') private livreursService = () => new LivreursService();
  @Provide('restaurateursService') private restaurateursService = () => new RestaurateursService();
  @Provide('restaurantsService') private restaurantsService = () => new RestaurantsService();
  @Provide('clientsService') private clientsService = () => new ClientsService();
  @Provide('commandesService') private commandesService = () => new CommandesService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
