import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import RestaurantsService from '@/entities/restaurants/restaurants.service';
import { IRestaurants } from '@/shared/model/restaurants.model';

import CooperativesService from '@/entities/cooperatives/cooperatives.service';
import { ICooperatives } from '@/shared/model/cooperatives.model';

import ClientsService from '@/entities/clients/clients.service';
import { IClients } from '@/shared/model/clients.model';

import LivreursService from '@/entities/livreurs/livreurs.service';
import { ILivreurs } from '@/shared/model/livreurs.model';

import { IRestaurateurs, Restaurateurs } from '@/shared/model/restaurateurs.model';
import RestaurateursService from './restaurateurs.service';

const validations: any = {
  restaurateurs: {
    nom: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
    prenom: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
    city: {},
  },
};

@Component({
  validations,
})
export default class RestaurateursUpdate extends Vue {
  @Inject('restaurateursService') private restaurateursService: () => RestaurateursService;
  @Inject('alertService') private alertService: () => AlertService;

  public restaurateurs: IRestaurateurs = new Restaurateurs();

  @Inject('restaurantsService') private restaurantsService: () => RestaurantsService;

  public restaurants: IRestaurants[] = [];

  @Inject('cooperativesService') private cooperativesService: () => CooperativesService;

  public cooperatives: ICooperatives[] = [];

  @Inject('clientsService') private clientsService: () => ClientsService;

  public clients: IClients[] = [];

  @Inject('livreursService') private livreursService: () => LivreursService;

  public livreurs: ILivreurs[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.restaurateursId) {
        vm.retrieveRestaurateurs(to.params.restaurateursId);
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
  }

  public save(): void {
    this.isSaving = true;
    if (this.restaurateurs.id) {
      this.restaurateursService()
        .update(this.restaurateurs)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.restaurateurs.updated', { param: param.id });
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
      this.restaurateursService()
        .create(this.restaurateurs)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.restaurateurs.created', { param: param.id });
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

  public retrieveRestaurateurs(restaurateursId): void {
    this.restaurateursService()
      .find(restaurateursId)
      .then(res => {
        this.restaurateurs = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.restaurantsService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
    this.cooperativesService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
    this.clientsService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
    this.livreursService()
      .retrieve()
      .then(res => {
        this.livreurs = res.data;
      });
  }
}
