/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ZonesUpdateComponent from '@/entities/zones/zones-update.vue';
import ZonesClass from '@/entities/zones/zones-update.component';
import ZonesService from '@/entities/zones/zones.service';

import CooperativesService from '@/entities/cooperatives/cooperatives.service';
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
  describe('Zones Management Update Component', () => {
    let wrapper: Wrapper<ZonesClass>;
    let comp: ZonesClass;
    let zonesServiceStub: SinonStubbedInstance<ZonesService>;

    beforeEach(() => {
      zonesServiceStub = sinon.createStubInstance<ZonesService>(ZonesService);

      wrapper = shallowMount<ZonesClass>(ZonesUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          zonesService: () => zonesServiceStub,
          alertService: () => new AlertService(),

          cooperativesService: () =>
            sinon.createStubInstance<CooperativesService>(CooperativesService, {
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
        comp.zones = entity;
        zonesServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(zonesServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.zones = entity;
        zonesServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(zonesServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundZones = { id: 123 };
        zonesServiceStub.find.resolves(foundZones);
        zonesServiceStub.retrieve.resolves([foundZones]);

        // WHEN
        comp.beforeRouteEnter({ params: { zonesId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.zones).toBe(foundZones);
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
