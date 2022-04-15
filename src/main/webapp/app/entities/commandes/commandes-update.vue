<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.commandes.home.createOrEditLabel"
          data-cy="CommandesCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.commandes.home.createOrEditLabel')"
        >
          Create or edit a Commandes
        </h2>
        <div>
          <div class="form-group" v-if="commandes.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="commandes.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.commandes.estPret')" for="commandes-estPret">Est Pret</label>
            <input
              type="checkbox"
              class="form-check"
              name="estPret"
              id="commandes-estPret"
              data-cy="estPret"
              :class="{ valid: !$v.commandes.estPret.$invalid, invalid: $v.commandes.estPret.$invalid }"
              v-model="$v.commandes.estPret.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.commandes.estPaye')" for="commandes-estPaye">Est Paye</label>
            <input
              type="checkbox"
              class="form-check"
              name="estPaye"
              id="commandes-estPaye"
              data-cy="estPaye"
              :class="{ valid: !$v.commandes.estPaye.$invalid, invalid: $v.commandes.estPaye.$invalid }"
              v-model="$v.commandes.estPaye.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.commandes.client')" for="commandes-client">Client</label>
            <select class="form-control" id="commandes-client" data-cy="client" name="client" v-model="commandes.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="commandes.client && clientsOption.id === commandes.client.id ? commandes.client : clientsOption"
                v-for="clientsOption in clients"
                :key="clientsOption.id"
              >
                {{ clientsOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label v-text="$t('coopcycleJhipsterApp.commandes.restaurant')" for="commandes-restaurant">Restaurant</label>
            <select
              class="form-control"
              id="commandes-restaurants"
              data-cy="restaurant"
              multiple
              name="restaurant"
              v-if="commandes.restaurants !== undefined"
              v-model="commandes.restaurants"
            >
              <option
                v-bind:value="getSelected(commandes.restaurants, restaurantsOption)"
                v-for="restaurantsOption in restaurants"
                :key="restaurantsOption.id"
              >
                {{ restaurantsOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.commandes.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./commandes-update.component.ts"></script>
