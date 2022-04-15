import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICommandes } from '@/shared/model/commandes.model';
import CommandesService from './commandes.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CommandesDetails extends Vue {
  @Inject('commandesService') private commandesService: () => CommandesService;
  @Inject('alertService') private alertService: () => AlertService;

  public commandes: ICommandes = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commandesId) {
        vm.retrieveCommandes(to.params.commandesId);
      }
    });
  }

  public retrieveCommandes(commandesId) {
    this.commandesService()
      .find(commandesId)
      .then(res => {
        this.commandes = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
