<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.livreurs.home.createOrEditLabel"
          data-cy="LivreursCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.livreurs.home.createOrEditLabel')"
        >
          Create or edit a Livreurs
        </h2>
        <div>
          <div class="form-group" v-if="livreurs.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="livreurs.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.livreurs.nom')" for="livreurs-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="livreurs-nom"
              data-cy="nom"
              :class="{ valid: !$v.livreurs.nom.$invalid, invalid: $v.livreurs.nom.$invalid }"
              v-model="$v.livreurs.nom.$model"
              required
            />
            <div v-if="$v.livreurs.nom.$anyDirty && $v.livreurs.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.livreurs.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.livreurs.nom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.livreurs.nom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.livreurs.prenom')" for="livreurs-prenom">Prenom</label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="livreurs-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.livreurs.prenom.$invalid, invalid: $v.livreurs.prenom.$invalid }"
              v-model="$v.livreurs.prenom.$model"
              required
            />
            <div v-if="$v.livreurs.prenom.$anyDirty && $v.livreurs.prenom.$invalid">
              <small class="form-text text-danger" v-if="!$v.livreurs.prenom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.livreurs.prenom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.livreurs.prenom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.livreurs.city')" for="livreurs-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="livreurs-city"
              data-cy="city"
              :class="{ valid: !$v.livreurs.city.$invalid, invalid: $v.livreurs.city.$invalid }"
              v-model="$v.livreurs.city.$model"
              required
            />
            <div v-if="$v.livreurs.city.$anyDirty && $v.livreurs.city.$invalid">
              <small class="form-text text-danger" v-if="!$v.livreurs.city.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.livreurs.city.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.livreurs.city.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.livreurs.restaurateur')" for="livreurs-restaurateur"
              >Restaurateur</label
            >
            <select
              class="form-control"
              id="livreurs-restaurateur"
              data-cy="restaurateur"
              name="restaurateur"
              v-model="livreurs.restaurateur"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  livreurs.restaurateur && restaurateursOption.id === livreurs.restaurateur.id ? livreurs.restaurateur : restaurateursOption
                "
                v-for="restaurateursOption in restaurateurs"
                :key="restaurateursOption.id"
              >
                {{ restaurateursOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.livreurs.cooperative')" for="livreurs-cooperative"
              >Cooperative</label
            >
            <select class="form-control" id="livreurs-cooperative" data-cy="cooperative" name="cooperative" v-model="livreurs.cooperative">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  livreurs.cooperative && cooperativesOption.id === livreurs.cooperative.id ? livreurs.cooperative : cooperativesOption
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
            :disabled="$v.livreurs.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./livreurs-update.component.ts"></script>
