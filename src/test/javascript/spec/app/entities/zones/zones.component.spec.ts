/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ZonesComponent from '@/entities/zones/zones.vue';
import ZonesClass from '@/entities/zones/zones.component';
import ZonesService from '@/entities/zones/zones.service';
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
  describe('Zones Management Component', () => {
    let wrapper: Wrapper<ZonesClass>;
    let comp: ZonesClass;
    let zonesServiceStub: SinonStubbedInstance<ZonesService>;

    beforeEach(() => {
      zonesServiceStub = sinon.createStubInstance<ZonesService>(ZonesService);
      zonesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ZonesClass>(ZonesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          zonesService: () => zonesServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      zonesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllZoness();
      await comp.$nextTick();

      // THEN
      expect(zonesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.zones[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      zonesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(zonesServiceStub.retrieve.callCount).toEqual(1);

      comp.removeZones();
      await comp.$nextTick();

      // THEN
      expect(zonesServiceStub.delete.called).toBeTruthy();
      expect(zonesServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
