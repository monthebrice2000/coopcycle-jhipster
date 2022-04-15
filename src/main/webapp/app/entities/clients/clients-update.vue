<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleJhipsterApp.clients.home.createOrEditLabel"
          data-cy="ClientsCreateUpdateHeading"
          v-text="$t('coopcycleJhipsterApp.clients.home.createOrEditLabel')"
        >
          Create or edit a Clients
        </h2>
        <div>
          <div class="form-group" v-if="clients.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="clients.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.clients.nom')" for="clients-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="clients-nom"
              data-cy="nom"
              :class="{ valid: !$v.clients.nom.$invalid, invalid: $v.clients.nom.$invalid }"
              v-model="$v.clients.nom.$model"
              required
            />
            <div v-if="$v.clients.nom.$anyDirty && $v.clients.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.clients.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.clients.nom.minLength" v-text="$t('entity.validation.minlength', { min: 10 })">
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.clients.nom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.clients.prenom')" for="clients-prenom">Prenom</label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="clients-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.clients.prenom.$invalid, invalid: $v.clients.prenom.$invalid }"
              v-model="$v.clients.prenom.$model"
              required
            />
            <div v-if="$v.clients.prenom.$anyDirty && $v.clients.prenom.$invalid">
              <small class="form-text text-danger" v-if="!$v.clients.prenom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.clients.prenom.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.clients.prenom.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.clients.email')" for="clients-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="clients-email"
              data-cy="email"
              :class="{ valid: !$v.clients.email.$invalid, invalid: $v.clients.email.$invalid }"
              v-model="$v.clients.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.clients.phoneNumber')" for="clients-phoneNumber"
              >Phone Number</label
            >
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="clients-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !$v.clients.phoneNumber.$invalid, invalid: $v.clients.phoneNumber.$invalid }"
              v-model="$v.clients.phoneNumber.$model"
              required
            />
            <div v-if="$v.clients.phoneNumber.$anyDirty && $v.clients.phoneNumber.$invalid">
              <small class="form-text text-danger" v-if="!$v.clients.phoneNumber.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.clients.phoneNumber.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.clients.phoneNumber.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 255 })"
              >
                This field cannot be longer than 255 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleJhipsterApp.clients.restaurateur')" for="clients-restaurateur"
              >Restaurateur</label
            >
            <select
              class="form-control"
              id="clients-restaurateur"
              data-cy="restaurateur"
              name="restaurateur"
              v-model="clients.restaurateur"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  clients.restaurateur && restaurateursOption.id === clients.restaurateur.id ? clients.restaurateur : restaurateursOption
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
            :disabled="$v.clients.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./clients-update.component.ts"></script>
