/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LivreursComponent from '@/entities/livreurs/livreurs.vue';
import LivreursClass from '@/entities/livreurs/livreurs.component';
import LivreursService from '@/entities/livreurs/livreurs.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Livreurs Management Component', () => {
    let wrapper: Wrapper<LivreursClass>;
    let comp: LivreursClass;
    let livreursServiceStub: SinonStubbedInstance<LivreursService>;

    beforeEach(() => {
      livreursServiceStub = sinon.createStubInstance<LivreursService>(LivreursService);
      livreursServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<LivreursClass>(LivreursComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          livreursService: () => livreursServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      livreursServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllLivreurss();
      await comp.$nextTick();

      // THEN
      expect(livreursServiceStub.retrieve.called).toBeTruthy();
      expect(comp.livreurs[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      livreursServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(livreursServiceStub.retrieve.callCount).toEqual(1);

      comp.removeLivreurs();
      await comp.$nextTick();

      // THEN
      expect(livreursServiceStub.delete.called).toBeTruthy();
      expect(livreursServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
