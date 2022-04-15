import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';
import { IRestaurateurs } from '@/shared/model/restaurateurs.model';

import CommandesService from '@/entities/commandes/commandes.service';
import { ICommandes } from '@/shared/model/commandes.model';

import { IRestaurants, Restaurants } from '@/shared/model/restaurants.model';
import RestaurantsService from './restaurants.service';

const validations: any = {
  restaurants: {
    nom: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
    carte: {
      required,
    },
    menu: {},
  },
};

@Component({
  validations,
})
export default class RestaurantsUpdate extends Vue {
  @Inject('restaurantsService') private restaurantsService: () => RestaurantsService;
  @Inject('alertService') private alertService: () => AlertService;

  public restaurants: IRestaurants = new Restaurants();

  @Inject('restaurateursService') private restaurateursService: () => RestaurateursService;

  public restaurateurs: IRestaurateurs[] = [];

  @Inject('commandesService') private commandesService: () => CommandesService;

  public commandes: ICommandes[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.restaurantsId) {
        vm.retrieveRestaurants(to.params.restaurantsId);
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
    if (this.restaurants.id) {
      this.restaurantsService()
        .update(this.restaurants)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.restaurants.updated', { param: param.id });
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
      this.restaurantsService()
        .create(this.restaurants)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.restaurants.created', { param: param.id });
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

  public retrieveRestaurants(restaurantsId): void {
    this.restaurantsService()
      .find(restaurantsId)
      .then(res => {
        this.restaurants = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.restaurateursService()
      .retrieve()
      .then(res => {
        this.restaurateurs = res.data;
      });
    this.commandesService()
      .retrieve()
      .then(res => {
        this.commandes = res.data;
      });
  }
}
