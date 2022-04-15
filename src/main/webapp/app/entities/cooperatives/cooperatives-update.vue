<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.cooperatives.home.createOrEditLabel"
          data-cy="CooperativesCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.cooperatives.home.createOrEditLabel')"
        >
          Create or edit a Cooperatives
        </h2>
        <div>
          <div class="form-group" v-if="cooperatives.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="cooperatives.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.cooperatives.nom')" for="cooperatives-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="cooperatives-nom"
              data-cy="nom"
              :class="{ valid: !$v.cooperatives.nom.$invalid, invalid: $v.cooperatives.nom.$invalid }"
              v-model="$v.cooperatives.nom.$model"
              required
            />
            <div v-if="$v.cooperatives.nom.$anyDirty && $v.cooperatives.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.cooperatives.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.cooperatives.nom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.cooperatives.nom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.cooperatives.zone')" for="cooperatives-zone">Zone</label>
            <select class="form-control" id="cooperatives-zone" data-cy="zone" name="zone" v-model="cooperatives.zone">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="cooperatives.zone && zonesOption.id === cooperatives.zone.id ? cooperatives.zone : zonesOption"
                v-for="zonesOption in zones"
                :key="zonesOption.id"
              >
                {{ zonesOption.id }}
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
            :disabled="$v.cooperatives.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./cooperatives-update.component.ts"></script>
