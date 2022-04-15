/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CommandesDetailComponent from '@/entities/commandes/commandes-details.vue';
import CommandesClass from '@/entities/commandes/commandes-details.component';
import CommandesService from '@/entities/commandes/commandes.service';
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
  describe('Commandes Management Detail Component', () => {
    let wrapper: Wrapper<CommandesClass>;
    let comp: CommandesClass;
    let commandesServiceStub: SinonStubbedInstance<CommandesService>;

    beforeEach(() => {
      commandesServiceStub = sinon.createStubInstance<CommandesService>(CommandesService);

      wrapper = shallowMount<CommandesClass>(CommandesDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { commandesService: () => commandesServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCommandes = { id: 'ABC' };
        commandesServiceStub.find.resolves(foundCommandes);

        // WHEN
        comp.retrieveCommandes('ABC');
        await comp.$nextTick();

        // THEN
        expect(comp.commandes).toBe(foundCommandes);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommandes = { id: 'ABC' };
        commandesServiceStub.find.resolves(foundCommandes);

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
