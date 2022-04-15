/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import RestaurantsDetailComponent from '@/entities/restaurants/restaurants-details.vue';
import RestaurantsClass from '@/entities/restaurants/restaurants-details.component';
import RestaurantsService from '@/entities/restaurants/restaurants.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Restaurants Management Detail Component', () => {
    let wrapper: Wrapper<RestaurantsClass>;
    let comp: RestaurantsClass;
    let restaurantsServiceStub: SinonStubbedInstance<RestaurantsService>;

    beforeEach(() => {
      restaurantsServiceStub = sinon.createStubInstance<RestaurantsService>(RestaurantsService);

      wrapper = shallowMount<RestaurantsClass>(RestaurantsDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { restaurantsService: () => restaurantsServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRestaurants = { id: 123 };
        restaurantsServiceStub.find.resolves(foundRestaurants);

        // WHEN
        comp.retrieveRestaurants(123);
        await comp.$nextTick();

        // THEN
        expect(comp.restaurants).toBe(foundRestaurants);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRestaurants = { id: 123 };
        restaurantsServiceStub.find.resolves(foundRestaurants);

        // WHEN
        comp.beforeRouteEnter({ params: { restaurantsId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.restaurants).toBe(foundRestaurants);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
