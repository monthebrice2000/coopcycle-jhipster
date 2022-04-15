import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRestaurants } from '@/shared/model/restaurants.model';
import RestaurantsService from './restaurants.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class RestaurantsDetails extends Vue {
  @Inject('restaurantsService') private restaurantsService: () => RestaurantsService;
  @Inject('alertService') private alertService: () => AlertService;

  public restaurants: IRestaurants = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.restaurantsId) {
        vm.retrieveRestaurants(to.params.restaurantsId);
      }
    });
  }

  public retrieveRestaurants(restaurantsId) {
    this.restaurantsService()
      .find(restaurantsId)
      .then(res => {
        this.restaurants = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
