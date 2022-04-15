/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClientsUpdateComponent from '@/entities/clients/clients-update.vue';
import ClientsClass from '@/entities/clients/clients-update.component';
import ClientsService from '@/entities/clients/clients.service';

import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';

import CommandesService from '@/entities/commandes/commandes.service';
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
  describe('Clients Management Update Component', () => {
    let wrapper: Wrapper<ClientsClass>;
    let comp: ClientsClass;
    let clientsServiceStub: SinonStubbedInstance<ClientsService>;

    beforeEach(() => {
      clientsServiceStub = sinon.createStubInstance<ClientsService>(ClientsService);

      wrapper = shallowMount<ClientsClass>(ClientsUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          clientsService: () => clientsServiceStub,
          alertService: () => new AlertService(),

          restaurateursService: () =>
            sinon.createStubInstance<RestaurateursService>(RestaurateursService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          commandesService: () =>
            sinon.createStubInstance<CommandesService>(CommandesService, {
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
        comp.clients = entity;
        clientsServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clientsServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.clients = entity;
        clientsServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clientsServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundClients = { id: 123 };
        clientsServiceStub.find.resolves(foundClients);
        clientsServiceStub.retrieve.resolves([foundClients]);

        // WHEN
        comp.beforeRouteEnter({ params: { clientsId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.clients).toBe(foundClients);
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
