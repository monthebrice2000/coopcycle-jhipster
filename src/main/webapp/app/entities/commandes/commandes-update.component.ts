import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ClientsService from '@/entities/clients/clients.service';
import { IClients } from '@/shared/model/clients.model';

import RestaurantsService from '@/entities/restaurants/restaurants.service';
import { IRestaurants } from '@/shared/model/restaurants.model';

import { ICommandes, Commandes } from '@/shared/model/commandes.model';
import CommandesService from './commandes.service';

const validations: any = {
  commandes: {
    estPret: {},
    estPaye: {},
  },
};

@Component({
  validations,
})
export default class CommandesUpdate extends Vue {
  @Inject('commandesService') private commandesService: () => CommandesService;
  @Inject('alertService') private alertService: () => AlertService;

  public commandes: ICommandes = new Commandes();

  @Inject('clientsService') private clientsService: () => ClientsService;

  public clients: IClients[] = [];

  @Inject('restaurantsService') private restaurantsService: () => RestaurantsService;

  public restaurants: IRestaurants[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commandesId) {
        vm.retrieveCommandes(to.params.commandesId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.commandes.restaurants = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.commandes.id) {
      this.commandesService()
        .update(this.commandes)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.commandes.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.commandesService()
        .create(this.commandes)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.commandes.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveCommandes(commandesId): void {
    this.commandesService()
      .find(commandesId)
      .then(res => {
        this.commandes = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.clientsService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
    this.restaurantsService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
