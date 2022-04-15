/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CooperativesDetailComponent from '@/entities/cooperatives/cooperatives-details.vue';
import CooperativesClass from '@/entities/cooperatives/cooperatives-details.component';
import CooperativesService from '@/entities/cooperatives/cooperatives.service';
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
  describe('Cooperatives Management Detail Component', () => {
    let wrapper: Wrapper<CooperativesClass>;
    let comp: CooperativesClass;
    let cooperativesServiceStub: SinonStubbedInstance<CooperativesService>;

    beforeEach(() => {
      cooperativesServiceStub = sinon.createStubInstance<CooperativesService>(CooperativesService);

      wrapper = shallowMount<CooperativesClass>(CooperativesDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { cooperativesService: () => cooperativesServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCooperatives = { id: 123 };
        cooperativesServiceStub.find.resolves(foundCooperatives);

        // WHEN
        comp.retrieveCooperatives(123);
        await comp.$nextTick();

        // THEN
        expect(comp.cooperatives).toBe(foundCooperatives);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCooperatives = { id: 123 };
        cooperativesServiceStub.find.resolves(foundCooperatives);

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
