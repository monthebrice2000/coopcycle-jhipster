/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import LivreursDetailComponent from '@/entities/livreurs/livreurs-details.vue';
import LivreursClass from '@/entities/livreurs/livreurs-details.component';
import LivreursService from '@/entities/livreurs/livreurs.service';
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
  describe('Livreurs Management Detail Component', () => {
    let wrapper: Wrapper<LivreursClass>;
    let comp: LivreursClass;
    let livreursServiceStub: SinonStubbedInstance<LivreursService>;

    beforeEach(() => {
      livreursServiceStub = sinon.createStubInstance<LivreursService>(LivreursService);

      wrapper = shallowMount<LivreursClass>(LivreursDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { livreursService: () => livreursServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLivreurs = { id: 123 };
        livreursServiceStub.find.resolves(foundLivreurs);

        // WHEN
        comp.retrieveLivreurs(123);
        await comp.$nextTick();

        // THEN
        expect(comp.livreurs).toBe(foundLivreurs);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLivreurs = { id: 123 };
        livreursServiceStub.find.resolves(foundLivreurs);

        // WHEN
        comp.beforeRouteEnter({ params: { livreursId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.livreurs).toBe(foundLivreurs);
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
