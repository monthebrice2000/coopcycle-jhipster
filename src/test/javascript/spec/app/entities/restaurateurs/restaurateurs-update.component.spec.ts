/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RestaurateursUpdateComponent from '@/entities/restaurateurs/restaurateurs-update.vue';
import RestaurateursClass from '@/entities/restaurateurs/restaurateurs-update.component';
import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';

import RestaurantsService from '@/entities/restaurants/restaurants.service';

import CooperativesService from '@/entities/cooperatives/cooperatives.service';

import ClientsService from '@/entities/clients/clients.service';

import LivreursService from '@/entities/livreurs/livreurs.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Restaurateurs Management Update Component', () => {
    let wrapper: Wrapper<RestaurateursClass>;
    let comp: RestaurateursClass;
    let restaurateursServiceStub: SinonStubbedInstance<RestaurateursService>;

    beforeEach(() => {
      restaurateursServiceStub = sinon.createStubInstance<RestaurateursService>(RestaurateursService);

      wrapper = shallowMount<RestaurateursClass>(RestaurateursUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          restaurateursService: () => restaurateursServiceStub,
          alertService: () => new AlertService(),

          restaurantsService: () =>
            sinon.createStubInstance<RestaurantsService>(RestaurantsService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          cooperativesService: () =>
            sinon.createStubInstance<CooperativesService>(CooperativesService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          clientsService: () =>
            sinon.createStubInstance<ClientsService>(ClientsService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          livreursService: () =>
            sinon.createStubInstance<LivreursService>(LivreursService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.restaurateurs = entity;
        restaurateursServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(restaurateursServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.restaurateurs = entity;
        restaurateursServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(restaurateursServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRestaurateurs = { id: 123 };
        restaurateursServiceStub.find.resolves(foundRestaurateurs);
        restaurateursServiceStub.retrieve.resolves([foundRestaurateurs]);

        // WHEN
        comp.beforeRouteEnter({ params: { restaurateursId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.restaurateurs).toBe(foundRestaurateurs);
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
