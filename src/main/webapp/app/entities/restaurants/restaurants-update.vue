<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.restaurants.home.createOrEditLabel"
          data-cy="RestaurantsCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.restaurants.home.createOrEditLabel')"
        >
          Create or edit a Restaurants
        </h2>
        <div>
          <div class="form-group" v-if="restaurants.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="restaurants.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurants.nom')" for="restaurants-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="restaurants-nom"
              data-cy="nom"
              :class="{ valid: !$v.restaurants.nom.$invalid, invalid: $v.restaurants.nom.$invalid }"
              v-model="$v.restaurants.nom.$model"
              required
            />
            <div v-if="$v.restaurants.nom.$anyDirty && $v.restaurants.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurants.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurants.nom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurants.nom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurants.carte')" for="restaurants-carte">Carte</label>
            <input
              type="text"
              class="form-control"
              name="carte"
              id="restaurants-carte"
              data-cy="carte"
              :class="{ valid: !$v.restaurants.carte.$invalid, invalid: $v.restaurants.carte.$invalid }"
              v-model="$v.restaurants.carte.$model"
              required
            />
            <div v-if="$v.restaurants.carte.$anyDirty && $v.restaurants.carte.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurants.carte.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurants.menu')" for="restaurants-menu">Menu</label>
            <input
              type="text"
              class="form-control"
              name="menu"
              id="restaurants-menu"
              data-cy="menu"
              :class="{ valid: !$v.restaurants.menu.$invalid, invalid: $v.restaurants.menu.$invalid }"
              v-model="$v.restaurants.menu.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.restaurants.restaurateur')" for="restaurants-restaurateur"
              >Restaurateur</label
            >
            <select
              class="form-control"
              id="restaurants-restaurateur"
              data-cy="restaurateur"
              name="restaurateur"
              v-model="restaurants.restaurateur"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  restaurants.restaurateur && restaurateursOption.id === restaurants.restaurateur.id
                    ? restaurants.restaurateur
                    : restaurateursOption
                "
                v-for="restaurateursOption in restaurateurs"
                :key="restaurateursOption.id"
              >
                {{ restaurateursOption.id }}
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
            :disabled="$v.restaurants.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./restaurants-update.component.ts"></script>
