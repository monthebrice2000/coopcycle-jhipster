/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ZonesDetailComponent from '@/entities/zones/zones-details.vue';
import ZonesClass from '@/entities/zones/zones-details.component';
import ZonesService from '@/entities/zones/zones.service';
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
  describe('Zones Management Detail Component', () => {
    let wrapper: Wrapper<ZonesClass>;
    let comp: ZonesClass;
    let zonesServiceStub: SinonStubbedInstance<ZonesService>;

    beforeEach(() => {
      zonesServiceStub = sinon.createStubInstance<ZonesService>(ZonesService);

      wrapper = shallowMount<ZonesClass>(ZonesDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { zonesService: () => zonesServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundZones = { id: 123 };
        zonesServiceStub.find.resolves(foundZones);

        // WHEN
        comp.retrieveZones(123);
        await comp.$nextTick();

        // THEN
        expect(comp.zones).toBe(foundZones);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundZones = { id: 123 };
        zonesServiceStub.find.resolves(foundZones);

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
