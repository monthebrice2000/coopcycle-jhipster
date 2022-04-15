/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CommandesUpdateComponent from '@/entities/commandes/commandes-update.vue';
import CommandesClass from '@/entities/commandes/commandes-update.component';
import CommandesService from '@/entities/commandes/commandes.service';

import ClientsService from '@/entities/clients/clients.service';

import RestaurantsService from '@/entities/restaurants/restaurants.service';
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
  describe('Commandes Management Update Component', () => {
    let wrapper: Wrapper<CommandesClass>;
    let comp: CommandesClass;
    let commandesServiceStub: SinonStubbedInstance<CommandesService>;

    beforeEach(() => {
      commandesServiceStub = sinon.createStubInstance<CommandesService>(CommandesService);

      wrapper = shallowMount<CommandesClass>(CommandesUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          commandesService: () => commandesServiceStub,
          alertService: () => new AlertService(),

          clientsService: () =>
            sinon.createStubInstance<ClientsService>(ClientsService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          restaurantsService: () =>
            sinon.createStubInstance<RestaurantsService>(RestaurantsService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 'ABC' };
        comp.commandes = entity;
        commandesServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commandesServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.commandes = entity;
        commandesServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commandesServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommandes = { id: 'ABC' };
        commandesServiceStub.find.resolves(foundCommandes);
        commandesServiceStub.retrieve.resolves([foundCommandes]);

        // WHEN
        comp.beforeRouteEnter({ params: { commandesId: 'ABC' } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.commandes).toBe(foundCommandes);
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
