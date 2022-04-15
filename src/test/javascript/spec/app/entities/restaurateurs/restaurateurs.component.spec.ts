/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RestaurateursComponent from '@/entities/restaurateurs/restaurateurs.vue';
import RestaurateursClass from '@/entities/restaurateurs/restaurateurs.component';
import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';
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
  describe('Restaurateurs Management Component', () => {
    let wrapper: Wrapper<RestaurateursClass>;
    let comp: RestaurateursClass;
    let restaurateursServiceStub: SinonStubbedInstance<RestaurateursService>;

    beforeEach(() => {
      restaurateursServiceStub = sinon.createStubInstance<RestaurateursService>(RestaurateursService);
      restaurateursServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RestaurateursClass>(RestaurateursComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          restaurateursService: () => restaurateursServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      restaurateursServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRestaurateurss();
      await comp.$nextTick();

      // THEN
      expect(restaurateursServiceStub.retrieve.called).toBeTruthy();
      expect(comp.restaurateurs[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      restaurateursServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(restaurateursServiceStub.retrieve.callCount).toEqual(1);

      comp.removeRestaurateurs();
      await comp.$nextTick();

      // THEN
      expect(restaurateursServiceStub.delete.called).toBeTruthy();
      expect(restaurateursServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
