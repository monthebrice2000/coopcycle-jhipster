import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILivreurs } from '@/shared/model/livreurs.model';

import LivreursService from './livreurs.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Livreurs extends Vue {
  @Inject('livreursService') private livreursService: () => LivreursService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public livreurs: ILivreurs[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLivreurss();
  }

  public clear(): void {
    this.retrieveAllLivreurss();
  }

  public retrieveAllLivreurss(): void {
    this.isFetching = true;
    this.livreursService()
      .retrieve()
      .then(
        res => {
          this.livreurs = res.data;
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

  public prepareRemove(instance: ILivreurs): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLivreurs(): void {
    this.livreursService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.livreurs.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLivreurss();
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
