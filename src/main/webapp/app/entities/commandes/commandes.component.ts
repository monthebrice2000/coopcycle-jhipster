import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICommandes } from '@/shared/model/commandes.model';

import CommandesService from './commandes.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Commandes extends Vue {
  @Inject('commandesService') private commandesService: () => CommandesService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: string = null;

  public commandes: ICommandes[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCommandess();
  }

  public clear(): void {
    this.retrieveAllCommandess();
  }

  public retrieveAllCommandess(): void {
    this.isFetching = true;
    this.commandesService()
      .retrieve()
      .then(
        res => {
          this.commandes = res.data;
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

  public prepareRemove(instance: ICommandes): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCommandes(): void {
    this.commandesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.commandes.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCommandess();
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
