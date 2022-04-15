/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RestaurantsComponent from '@/entities/restaurants/restaurants.vue';
import RestaurantsClass from '@/entities/restaurants/restaurants.component';
import RestaurantsService from '@/entities/restaurants/restaurants.service';
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
  describe('Restaurants Management Component', () => {
    let wrapper: Wrapper<RestaurantsClass>;
    let comp: RestaurantsClass;
    let restaurantsServiceStub: SinonStubbedInstance<RestaurantsService>;

    beforeEach(() => {
      restaurantsServiceStub = sinon.createStubInstance<RestaurantsService>(RestaurantsService);
      restaurantsServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RestaurantsClass>(RestaurantsComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          restaurantsService: () => restaurantsServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      restaurantsServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRestaurantss();
      await comp.$nextTick();

      // THEN
      expect(restaurantsServiceStub.retrieve.called).toBeTruthy();
      expect(comp.restaurants[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      restaurantsServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(restaurantsServiceStub.retrieve.callCount).toEqual(1);

      comp.removeRestaurants();
      await comp.$nextTick();

      // THEN
      expect(restaurantsServiceStub.delete.called).toBeTruthy();
      expect(restaurantsServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
