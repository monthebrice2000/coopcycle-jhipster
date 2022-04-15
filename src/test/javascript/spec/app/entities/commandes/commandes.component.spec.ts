/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CommandesComponent from '@/entities/commandes/commandes.vue';
import CommandesClass from '@/entities/commandes/commandes.component';
import CommandesService from '@/entities/commandes/commandes.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Commandes Management Component', () => {
    let wrapper: Wrapper<CommandesClass>;
    let comp: CommandesClass;
    let commandesServiceStub: SinonStubbedInstance<CommandesService>;

    beforeEach(() => {
      commandesServiceStub = sinon.createStubInstance<CommandesService>(CommandesService);
      commandesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CommandesClass>(CommandesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          commandesService: () => commandesServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      commandesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

      // WHEN
      comp.retrieveAllCommandess();
      await comp.$nextTick();

      // THEN
      expect(commandesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.commandes[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      commandesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 'ABC' });
      expect(commandesServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCommandes();
      await comp.$nextTick();

      // THEN
      expect(commandesServiceStub.delete.called).toBeTruthy();
      expect(commandesServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
