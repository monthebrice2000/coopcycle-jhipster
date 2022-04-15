<template>
  <div>
    <h2 id="page-heading" data-cy="RestaurantsHeading">
      <span v-text="$t('coopcycleJhipsterApp.restaurants.home.title')" id="restaurants-heading">Restaurants</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopcycleJhipsterApp.restaurants.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'RestaurantsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-restaurants"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopcycleJhipsterApp.restaurants.home.createLabel')"> Create a new Restaurants </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && restaurants && restaurants.length === 0">
      <span v-text="$t('coopcycleJhipsterApp.restaurants.home.notFound')">No restaurants found</span>
    </div>
    <div class="table-responsive" v-if="restaurants && restaurants.length > 0">
      <table class="table table-striped" aria-describedby="restaurants">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.restaurants.nom')">Nom</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.restaurants.carte')">Carte</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.restaurants.menu')">Menu</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.restaurants.restaurateur')">Restaurateur</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurants in restaurants" :key="restaurants.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RestaurantsView', params: { restaurantsId: restaurants.id } }">{{ restaurants.id }}</router-link>
            </td>
            <td>{{ restaurants.nom }}</td>
            <td>{{ restaurants.carte }}</td>
            <td>{{ restaurants.menu }}</td>
            <td>
              <div v-if="restaurants.restaurateur">
                <router-link :to="{ name: 'RestaurateursView', params: { restaurateursId: restaurants.restaurateur.id } }">{{
                  restaurants.restaurateur.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'RestaurantsView', params: { restaurantsId: restaurants.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'RestaurantsEdit', params: { restaurantsId: restaurants.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(restaurants)"
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
        ><span
          id="coopcycleJhipsterApp.restaurants.delete.question"
          data-cy="restaurantsDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-restaurants-heading" v-text="$t('coopcycleJhipsterApp.restaurants.delete.question', { id: removeId })">
          Are you sure you want to delete this Restaurants?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-restaurants"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeRestaurants()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./restaurants.component.ts"></script>
