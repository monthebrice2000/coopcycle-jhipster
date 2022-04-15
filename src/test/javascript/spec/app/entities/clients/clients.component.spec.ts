/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClientsComponent from '@/entities/clients/clients.vue';
import ClientsClass from '@/entities/clients/clients.component';
import ClientsService from '@/entities/clients/clients.service';
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
  describe('Clients Management Component', () => {
    let wrapper: Wrapper<ClientsClass>;
    let comp: ClientsClass;
    let clientsServiceStub: SinonStubbedInstance<ClientsService>;

    beforeEach(() => {
      clientsServiceStub = sinon.createStubInstance<ClientsService>(ClientsService);
      clientsServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ClientsClass>(ClientsComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          clientsService: () => clientsServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      clientsServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllClientss();
      await comp.$nextTick();

      // THEN
      expect(clientsServiceStub.retrieve.called).toBeTruthy();
      expect(comp.clients[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      clientsServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(clientsServiceStub.retrieve.callCount).toEqual(1);

      comp.removeClients();
      await comp.$nextTick();

      // THEN
      expect(clientsServiceStub.delete.called).toBeTruthy();
      expect(clientsServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
