import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';
import { IRestaurateurs } from '@/shared/model/restaurateurs.model';

import CommandesService from '@/entities/commandes/commandes.service';
import { ICommandes } from '@/shared/model/commandes.model';

import { IClients, Clients } from '@/shared/model/clients.model';
import ClientsService from './clients.service';

const validations: any = {
  clients: {
    nom: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
    prenom: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
    email: {},
    phoneNumber: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(255),
    },
  },
};

@Component({
  validations,
})
export default class ClientsUpdate extends Vue {
  @Inject('clientsService') private clientsService: () => ClientsService;
  @Inject('alertService') private alertService: () => AlertService;

  public clients: IClients = new Clients();

  @Inject('restaurateursService') private restaurateursService: () => RestaurateursService;

  public restaurateurs: IRestaurateurs[] = [];

  @Inject('commandesService') private commandesService: () => CommandesService;

  public commandes: ICommandes[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clientsId) {
        vm.retrieveClients(to.params.clientsId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.clients.id) {
      this.clientsService()
        .update(this.clients)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.clients.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.clientsService()
        .create(this.clients)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleJhipsterApp.clients.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveClients(clientsId): void {
    this.clientsService()
      .find(clientsId)
      .then(res => {
        this.clients = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.restaurateursService()
      .retrieve()
      .then(res => {
        this.restaurateurs = res.data;
      });
    this.commandesService()
      .retrieve()
      .then(res => {
        this.commandes = res.data;
      });
  }
}
