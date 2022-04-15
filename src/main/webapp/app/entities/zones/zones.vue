<template>
  <div>
    <h2 id="page-heading" data-cy="ZonesHeading">
      <span v-text="$t('coopcycleJhipsterApp.zones.home.title')" id="zones-heading">Zones</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopcycleJhipsterApp.zones.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ZonesCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-zones"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopcycleJhipsterApp.zones.home.createLabel')"> Create a new Zones </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && zones && zones.length === 0">
      <span v-text="$t('coopcycleJhipsterApp.zones.home.notFound')">No zones found</span>
    </div>
    <div class="table-responsive" v-if="zones && zones.length > 0">
      <table class="table table-striped" aria-describedby="zones">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.zones.ville')">Ville</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.zones.metropole')">Metropole</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.zones.communaute')">Communaute</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="zones in zones" :key="zones.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ZonesView', params: { zonesId: zones.id } }">{{ zones.id }}</router-link>
            </td>
            <td>{{ zones.ville }}</td>
            <td>{{ zones.metropole }}</td>
            <td>{{ zones.communaute }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ZonesView', params: { zonesId: zones.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ZonesEdit', params: { zonesId: zones.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(zones)"
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
        ><span id="coopcycleJhipsterApp.zones.delete.question" data-cy="zonesDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-zones-heading" v-text="$t('coopcycleJhipsterApp.zones.delete.question', { id: removeId })">
          Are you sure you want to delete this Zones?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-zones"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeZones()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./zones.component.ts"></script>
