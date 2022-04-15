import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICooperatives } from '@/shared/model/cooperatives.model';
import CooperativesService from './cooperatives.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CooperativesDetails extends Vue {
  @Inject('cooperativesService') private cooperativesService: () => CooperativesService;
  @Inject('alertService') private alertService: () => AlertService;

  public cooperatives: ICooperatives = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cooperativesId) {
        vm.retrieveCooperatives(to.params.cooperativesId);
      }
    });
  }

  public retrieveCooperatives(cooperativesId) {
    this.cooperativesService()
      .find(cooperativesId)
      .then(res => {
        this.cooperatives = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
