import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRestaurateurs } from '@/shared/model/restaurateurs.model';
import RestaurateursService from './restaurateurs.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class RestaurateursDetails extends Vue {
  @Inject('restaurateursService') private restaurateursService: () => RestaurateursService;
  @Inject('alertService') private alertService: () => AlertService;

  public restaurateurs: IRestaurateurs = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.restaurateursId) {
        vm.retrieveRestaurateurs(to.params.restaurateursId);
      }
    });
  }

  public retrieveRestaurateurs(restaurateursId) {
    this.restaurateursService()
      .find(restaurateursId)
      .then(res => {
        this.restaurateurs = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
