import { Component, Vue, Inject } from 'vue-property-decorator';

import { IClients } from '@/shared/model/clients.model';
import ClientsService from './clients.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ClientsDetails extends Vue {
  @Inject('clientsService') private clientsService: () => ClientsService;
  @Inject('alertService') private alertService: () => AlertService;

  public clients: IClients = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clientsId) {
        vm.retrieveClients(to.params.clientsId);
      }
    });
  }

  public retrieveClients(clientsId) {
    this.clientsService()
      .find(clientsId)
      .then(res => {
        this.clients = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
