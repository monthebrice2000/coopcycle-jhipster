/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CooperativesUpdateComponent from '@/entities/cooperatives/cooperatives-update.vue';
import CooperativesClass from '@/entities/cooperatives/cooperatives-update.component';
import CooperativesService from '@/entities/cooperatives/cooperatives.service';

import ZonesService from '@/entities/zones/zones.service';
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
  describe('Cooperatives Management Update Component', () => {
    let wrapper: Wrapper<CooperativesClass>;
    let comp: CooperativesClass;
    let cooperativesServiceStub: SinonStubbedInstance<CooperativesService>;

    beforeEach(() => {
      cooperativesServiceStub = sinon.createStubInstance<CooperativesService>(CooperativesService);

      wrapper = shallowMount<CooperativesClass>(CooperativesUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          cooperativesService: () => cooperativesServiceStub,
          alertService: () => new AlertService(),

          zonesService: () =>
            sinon.createStubInstance<ZonesService>(ZonesService, {
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
        comp.cooperatives = entity;
        cooperativesServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cooperativesServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.cooperatives = entity;
        cooperativesServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cooperativesServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCooperatives = { id: 123 };
        cooperativesServiceStub.find.resolves(foundCooperatives);
        cooperativesServiceStub.retrieve.resolves([foundCooperatives]);

        // WHEN
        comp.beforeRouteEnter({ params: { cooperativesId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.cooperatives).toBe(foundCooperatives);
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
