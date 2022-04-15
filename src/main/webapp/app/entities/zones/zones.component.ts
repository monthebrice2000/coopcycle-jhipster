import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IZones } from '@/shared/model/zones.model';

import ZonesService from './zones.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Zones extends Vue {
  @Inject('zonesService') private zonesService: () => ZonesService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public zones: IZones[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllZoness();
  }

  public clear(): void {
    this.retrieveAllZoness();
  }

  public retrieveAllZoness(): void {
    this.isFetching = true;
    this.zonesService()
      .retrieve()
      .then(
        res => {
          this.zones = res.data;
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

  public prepareRemove(instance: IZones): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeZones(): void {
    this.zonesService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.zones.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllZoness();
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
