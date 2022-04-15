import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IClients } from '@/shared/model/clients.model';

import ClientsService from './clients.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Clients extends Vue {
  @Inject('clientsService') private clientsService: () => ClientsService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public clients: IClients[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClientss();
  }

  public clear(): void {
    this.retrieveAllClientss();
  }

  public retrieveAllClientss(): void {
    this.isFetching = true;
    this.clientsService()
      .retrieve()
      .then(
        res => {
          this.clients = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IClients): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeClients(): void {
    this.clientsService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.clients.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllClientss();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
