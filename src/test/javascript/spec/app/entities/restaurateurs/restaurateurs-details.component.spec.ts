/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import RestaurateursDetailComponent from '@/entities/restaurateurs/restaurateurs-details.vue';
import RestaurateursClass from '@/entities/restaurateurs/restaurateurs-details.component';
import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';
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
  describe('Restaurateurs Management Detail Component', () => {
    let wrapper: Wrapper<RestaurateursClass>;
    let comp: RestaurateursClass;
    let restaurateursServiceStub: SinonStubbedInstance<RestaurateursService>;

    beforeEach(() => {
      restaurateursServiceStub = sinon.createStubInstance<RestaurateursService>(RestaurateursService);

      wrapper = shallowMount<RestaurateursClass>(RestaurateursDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { restaurateursService: () => restaurateursServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRestaurateurs = { id: 123 };
        restaurateursServiceStub.find.resolves(foundRestaurateurs);

        // WHEN
        comp.retrieveRestaurateurs(123);
        await comp.$nextTick();

        // THEN
        expect(comp.restaurateurs).toBe(foundRestaurateurs);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRestaurateurs = { id: 123 };
        restaurateursServiceStub.find.resolves(foundRestaurateurs);

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
