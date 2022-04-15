<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.restaurateurs.home.createOrEditLabel"
          data-cy="RestaurateursCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.restaurateurs.home.createOrEditLabel')"
        >
          Create or edit a Restaurateurs
        </h2>
        <div>
          <div class="form-group" v-if="restaurateurs.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="restaurateurs.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurateurs.nom')" for="restaurateurs-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="restaurateurs-nom"
              data-cy="nom"
              :class="{ valid: !$v.restaurateurs.nom.$invalid, invalid: $v.restaurateurs.nom.$invalid }"
              v-model="$v.restaurateurs.nom.$model"
              required
            />
            <div v-if="$v.restaurateurs.nom.$anyDirty && $v.restaurateurs.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurateurs.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurateurs.nom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurateurs.nom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurateurs.prenom')" for="restaurateurs-prenom"
              >Prenom</label
            >
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="restaurateurs-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.restaurateurs.prenom.$invalid, invalid: $v.restaurateurs.prenom.$invalid }"
              v-model="$v.restaurateurs.prenom.$model"
              required
            />
            <div v-if="$v.restaurateurs.prenom.$anyDirty && $v.restaurateurs.prenom.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurateurs.prenom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurateurs.prenom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurateurs.prenom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurateurs.city')" for="restaurateurs-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="restaurateurs-city"
              data-cy="city"
              :class="{ valid: !$v.restaurateurs.city.$invalid, invalid: $v.restaurateurs.city.$invalid }"
              v-model="$v.restaurateurs.city.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurateurs.cooperative')" for="restaurateurs-cooperative"
              >Cooperative</label
            >
            <select
              class="form-control"
              id="restaurateurs-cooperative"
              data-cy="cooperative"
              name="cooperative"
              v-model="restaurateurs.cooperative"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  restaurateurs.cooperative && cooperativesOption.id === restaurateurs.cooperative.id
                    ? restaurateurs.cooperative
                    : cooperativesOption
                "
                v-for="cooperativesOption in cooperatives"
                :key="cooperativesOption.id"
              >
                {{ cooperativesOption.id }}
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
            :disabled="$v.restaurateurs.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./restaurateurs-update.component.ts"></script>
