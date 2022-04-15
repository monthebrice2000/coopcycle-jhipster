import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILivreurs } from '@/shared/model/livreurs.model';
import LivreursService from './livreurs.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class LivreursDetails extends Vue {
  @Inject('livreursService') private livreursService: () => LivreursService;
  @Inject('alertService') private alertService: () => AlertService;

  public livreurs: ILivreurs = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.livreursId) {
        vm.retrieveLivreurs(to.params.livreursId);
      }
    });
  }

  public retrieveLivreurs(livreursId) {
    this.livreursService()
      .find(livreursId)
      .then(res => {
        this.livreurs = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
