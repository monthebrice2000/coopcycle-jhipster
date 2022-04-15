<template>
  <div>
    <h2 id="page-heading" data-cy="CommandesHeading">
      <span v-text="$t('coopcycleJhipsterApp.commandes.home.title')" id="commandes-heading">Commandes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopcycleJhipsterApp.commandes.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CommandesCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-commandes"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopcycleJhipsterApp.commandes.home.createLabel')"> Create a new Commandes </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && commandes && commandes.length === 0">
      <span v-text="$t('coopcycleJhipsterApp.commandes.home.notFound')">No commandes found</span>
    </div>
    <div class="table-responsive" v-if="commandes && commandes.length > 0">
      <table class="table table-striped" aria-describedby="commandes">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.commandes.estPret')">Est Pret</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.commandes.estPaye')">Est Paye</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.commandes.client')">Client</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.commandes.restaurant')">Restaurant</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="commandes in commandes" :key="commandes.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CommandesView', params: { commandesId: commandes.id } }">{{ commandes.id }}</router-link>
            </td>
            <td>{{ commandes.estPret }}</td>
            <td>{{ commandes.estPaye }}</td>
            <td>
              <div v-if="commandes.client">
                <router-link :to="{ name: 'ClientsView', params: { clientsId: commandes.client.id } }">{{
                  commandes.client.id
                }}</router-link>
              </div>
            </td>
            <td>
              <span v-for="(restaurant, i) in commandes.restaurants" :key="restaurant.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'RestaurantsView', params: { restaurantsId: restaurant.id } }">{{
                  restaurant.id
                }}</router-link>
              </span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CommandesView', params: { commandesId: commandes.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CommandesEdit', params: { commandesId: commandes.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(commandes)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="coopcycleJhipsterApp.commandes.delete.question" data-cy="commandesDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-commandes-heading" v-text="$t('coopcycleJhipsterApp.commandes.delete.question', { id: removeId })">
          Are you sure you want to delete this Commandes?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-commandes"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCommandes()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./commandes.component.ts"></script>
