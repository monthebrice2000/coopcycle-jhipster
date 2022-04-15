import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ZonesService from '@/entities/zones/zones.service';
import { IZones } from '@/shared/model/zones.model';

import { ICooperatives, Cooperatives } from '@/shared/model/cooperatives.model';
import CooperativesService from './cooperatives.service';

const validations: any = {
  cooperatives: {
    nom: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
  },
};

@Component({
  validations,
})
export default class CooperativesUpdate extends Vue {
  @Inject('cooperativesService') private cooperativesService: () => CooperativesService;
  @Inject('alertService') private alertService: () => AlertService;

  public cooperatives: ICooperatives = new Cooperatives();

  @Inject('zonesService') private zonesService: () => ZonesService;

  public zones: IZones[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cooperativesId) {
        vm.retrieveCooperatives(to.params.cooperativesId);
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
    if (this.cooperatives.id) {
      this.cooperativesService()
        .update(this.cooperatives)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.cooperatives.updated', { param: param.id });
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
      this.cooperativesService()
        .create(this.cooperatives)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.cooperatives.created', { param: param.id });
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

  public retrieveCooperatives(cooperativesId): void {
    this.cooperativesService()
      .find(cooperativesId)
      .then(res => {
        this.cooperatives = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.zonesService()
      .retrieve()
      .then(res => {
        this.zones = res.data;
      });
  }
}
