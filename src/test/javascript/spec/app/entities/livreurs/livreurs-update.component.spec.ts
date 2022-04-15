/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LivreursUpdateComponent from '@/entities/livreurs/livreurs-update.vue';
import LivreursClass from '@/entities/livreurs/livreurs-update.component';
import LivreursService from '@/entities/livreurs/livreurs.service';

import RestaurateursService from '@/entities/restaurateurs/restaurateurs.service';

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
  describe('Livreurs Management Update Component', () => {
    let wrapper: Wrapper<LivreursClass>;
    let comp: LivreursClass;
    let livreursServiceStub: SinonStubbedInstance<LivreursService>;

    beforeEach(() => {
      livreursServiceStub = sinon.createStubInstance<LivreursService>(LivreursService);

      wrapper = shallowMount<LivreursClass>(LivreursUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          livreursService: () => livreursServiceStub,
          alertService: () => new AlertService(),

          restaurateursService: () =>
            sinon.createStubInstance<RestaurateursService>(RestaurateursService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

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
        comp.livreurs = entity;
        livreursServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(livreursServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.livreurs = entity;
        livreursServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(livreursServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLivreurs = { id: 123 };
        livreursServiceStub.find.resolves(foundLivreurs);
        livreursServiceStub.retrieve.resolves([foundLivreurs]);

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
