import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRestaurateurs } from '@/shared/model/restaurateurs.model';

import RestaurateursService from './restaurateurs.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Restaurateurs extends Vue {
  @Inject('restaurateursService') private restaurateursService: () => RestaurateursService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public restaurateurs: IRestaurateurs[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRestaurateurss();
  }

  public clear(): void {
    this.retrieveAllRestaurateurss();
  }

  public retrieveAllRestaurateurss(): void {
    this.isFetching = true;
    this.restaurateursService()
      .retrieve()
      .then(
        res => {
          this.restaurateurs = res.data;
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

  public prepareRemove(instance: IRestaurateurs): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRestaurateurs(): void {
    this.restaurateursService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.restaurateurs.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllRestaurateurss();
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
