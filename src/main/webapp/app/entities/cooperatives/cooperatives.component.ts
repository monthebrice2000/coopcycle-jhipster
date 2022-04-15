import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICooperatives } from '@/shared/model/cooperatives.model';

import CooperativesService from './cooperatives.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Cooperatives extends Vue {
  @Inject('cooperativesService') private cooperativesService: () => CooperativesService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public cooperatives: ICooperatives[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCooperativess();
  }

  public clear(): void {
    this.retrieveAllCooperativess();
  }

  public retrieveAllCooperativess(): void {
    this.isFetching = true;
    this.cooperativesService()
      .retrieve()
      .then(
        res => {
          this.cooperatives = res.data;
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

  public prepareRemove(instance: ICooperatives): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCooperatives(): void {
    this.cooperativesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.cooperatives.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCooperativess();
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
