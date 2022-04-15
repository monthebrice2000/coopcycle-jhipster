<template>
  <div>
    <h2 id="page-heading" data-cy="ClientsHeading">
      <span v-text="$t('coopcycleJhipsterApp.clients.home.title')" id="clients-heading">Clients</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopcycleJhipsterApp.clients.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ClientsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-clients"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopcycleJhipsterApp.clients.home.createLabel')"> Create a new Clients </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && clients && clients.length === 0">
      <span v-text="$t('coopcycleJhipsterApp.clients.home.notFound')">No clients found</span>
    </div>
    <div class="table-responsive" v-if="clients && clients.length > 0">
      <table class="table table-striped" aria-describedby="clients">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.clients.nom')">Nom</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.clients.prenom')">Prenom</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.clients.email')">Email</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.clients.phoneNumber')">Phone Number</span></th>
            <th scope="row"><span v-text="$t('coopcycleJhipsterApp.clients.restaurateur')">Restaurateur</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="clients in clients" :key="clients.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ClientsView', params: { clientsId: clients.id } }">{{ clients.id }}</router-link>
            </td>
            <td>{{ clients.nom }}</td>
            <td>{{ clients.prenom }}</td>
            <td>{{ clients.email }}</td>
            <td>{{ clients.phoneNumber }}</td>
            <td>
              <div v-if="clients.restaurateur">
                <router-link :to="{ name: 'RestaurateursView', params: { restaurateursId: clients.restaurateur.id } }">{{
                  clients.restaurateur.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ClientsView', params: { clientsId: clients.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ClientsEdit', params: { clientsId: clients.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(clients)"
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
        ><span id="coopcycleJhipsterApp.clients.delete.question" data-cy="clientsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-clients-heading" v-text="$t('coopcycleJhipsterApp.clients.delete.question', { id: removeId })">
          Are you sure you want to delete this Clients?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-clients"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeClients()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./clients.component.ts"></script>
