import { Component, Vue, Inject } from 'vue-property-decorator';

import { IZones } from '@/shared/model/zones.model';
import ZonesService from './zones.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ZonesDetails extends Vue {
  @Inject('zonesService') private zonesService: () => ZonesService;
  @Inject('alertService') private alertService: () => AlertService;

  public zones: IZones = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.zonesId) {
        vm.retrieveZones(to.params.zonesId);
      }
    });
  }

  public retrieveZones(zonesId) {
    this.zonesService()
      .find(zonesId)
      .then(res => {
        this.zones = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
