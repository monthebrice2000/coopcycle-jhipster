import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';
import { IRestaurateurs } from '@/shared/model/restaurateurs.model';

import CooperativesService from '@/entities/cooperatives/cooperatives.service';
import { ICooperatives } from '@/shared/model/cooperatives.model';

import { ILivreurs, Livreurs } from '@/shared/model/livreurs.model';
import LivreursService from './livreurs.service';

const validations: any = {
  livreurs: {
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
    city: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
  },
};

@Component({
  validations,
})
export default class LivreursUpdate extends Vue {
  @Inject('livreursService') private livreursService: () => LivreursService;
  @Inject('alertService') private alertService: () => AlertService;

  public livreurs: ILivreurs = new Livreurs();

  @Inject('restaurateursService') private restaurateursService: () => RestaurateursService;

  public restaurateurs: IRestaurateurs[] = [];

  @Inject('cooperativesService') private cooperativesService: () => CooperativesService;

  public cooperatives: ICooperatives[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.livreursId) {
        vm.retrieveLivreurs(to.params.livreursId);
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
    if (this.livreurs.id) {
      this.livreursService()
        .update(this.livreurs)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.livreurs.updated', { param: param.id });
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
      this.livreursService()
        .create(this.livreurs)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.livreurs.created', { param: param.id });
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

  public retrieveLivreurs(livreursId): void {
    this.livreursService()
      .find(livreursId)
      .then(res => {
        this.livreurs = res;
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
    this.cooperativesService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
  }
}
