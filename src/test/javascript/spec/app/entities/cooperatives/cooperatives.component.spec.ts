/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CooperativesComponent from '@/entities/cooperatives/cooperatives.vue';
import CooperativesClass from '@/entities/cooperatives/cooperatives.component';
import CooperativesService from '@/entities/cooperatives/cooperatives.service';
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
  describe('Cooperatives Management Component', () => {
    let wrapper: Wrapper<CooperativesClass>;
    let comp: CooperativesClass;
    let cooperativesServiceStub: SinonStubbedInstance<CooperativesService>;

    beforeEach(() => {
      cooperativesServiceStub = sinon.createStubInstance<CooperativesService>(CooperativesService);
      cooperativesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CooperativesClass>(CooperativesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          cooperativesService: () => cooperativesServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      cooperativesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCooperativess();
      await comp.$nextTick();

      // THEN
      expect(cooperativesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.cooperatives[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      cooperativesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(cooperativesServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCooperatives();
      await comp.$nextTick();

      // THEN
      expect(cooperativesServiceStub.delete.called).toBeTruthy();
      expect(cooperativesServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
