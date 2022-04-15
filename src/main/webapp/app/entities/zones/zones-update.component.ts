import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CooperativesService from '@/entities/cooperatives/cooperatives.service';
import { ICooperatives } from '@/shared/model/cooperatives.model';

import { IZones, Zones } from '@/shared/model/zones.model';
import ZonesService from './zones.service';

const validations: any = {
  zones: {
    ville: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
    metropole: {},
    communaute: {},
  },
};

@Component({
  validations,
})
export default class ZonesUpdate extends Vue {
  @Inject('zonesService') private zonesService: () => ZonesService;
  @Inject('alertService') private alertService: () => AlertService;

  public zones: IZones = new Zones();

  @Inject('cooperativesService') private cooperativesService: () => CooperativesService;

  public cooperatives: ICooperatives[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.zonesId) {
        vm.retrieveZones(to.params.zonesId);
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
    if (this.zones.id) {
      this.zonesService()
        .update(this.zones)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.zones.updated', { param: param.id });
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
      this.zonesService()
        .create(this.zones)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.zones.created', { param: param.id });
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

  public retrieveZones(zonesId): void {
    this.zonesService()
      .find(zonesId)
      .then(res => {
        this.zones = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cooperativesService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
  }
}
