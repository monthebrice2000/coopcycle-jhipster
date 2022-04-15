<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.zones.home.createOrEditLabel"
          data-cy="ZonesCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.zones.home.createOrEditLabel')"
        >
          Create or edit a Zones
        </h2>
        <div>
          <div class="form-group" v-if="zones.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="zones.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.zones.ville')" for="zones-ville">Ville</label>
            <input
              type="text"
              class="form-control"
              name="ville"
              id="zones-ville"
              data-cy="ville"
              :class="{ valid: !$v.zones.ville.$invalid, invalid: $v.zones.ville.$invalid }"
              v-model="$v.zones.ville.$model"
              required
            />
            <div v-if="$v.zones.ville.$anyDirty && $v.zones.ville.$invalid">
              <small class="form-text text-danger" v-if="!$v.zones.ville.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.zones.ville.minLength" v-text="$t('entity.validation.minlength', { min: 10 })">
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.zones.ville.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.zones.metropole')" for="zones-metropole">Metropole</label>
            <input
              type="text"
              class="form-control"
              name="metropole"
              id="zones-metropole"
              data-cy="metropole"
              :class="{ valid: !$v.zones.metropole.$invalid, invalid: $v.zones.metropole.$invalid }"
              v-model="$v.zones.metropole.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.zones.communaute')" for="zones-communaute">Communaute</label>
            <input
              type="text"
              class="form-control"
              name="communaute"
              id="zones-communaute"
              data-cy="communaute"
              :class="{ valid: !$v.zones.communaute.$invalid, invalid: $v.zones.communaute.$invalid }"
              v-model="$v.zones.communaute.$model"
            />
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
            :disabled="$v.zones.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./zones-update.component.ts"></script>
