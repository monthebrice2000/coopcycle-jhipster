import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRestaurants } from '@/shared/model/restaurants.model';

import RestaurantsService from './restaurants.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Restaurants extends Vue {
  @Inject('restaurantsService') private restaurantsService: () => RestaurantsService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public restaurants: IRestaurants[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRestaurantss();
  }

  public clear(): void {
    this.retrieveAllRestaurantss();
  }

  public retrieveAllRestaurantss(): void {
    this.isFetching = true;
    this.restaurantsService()
      .retrieve()
      .then(
        res => {
          this.restaurants = res.data;
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

  public prepareRemove(instance: IRestaurants): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRestaurants(): void {
    this.restaurantsService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleJhipsterApp.restaurants.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllRestaurantss();
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
