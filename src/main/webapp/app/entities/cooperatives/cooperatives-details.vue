<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="cooperatives">
        <h2 class="jh-entity-heading" data-cy="cooperativesDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.cooperatives.detail.title')">Cooperatives</span> {{ cooperatives.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.cooperatives.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ cooperatives.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.cooperatives.zone')">Zone</span>
          </dt>
          <dd>
            <div v-if="cooperatives.zone">
              <router-link :to="{ name: 'ZonesView', params: { zonesId: cooperatives.zone.id } }">{{ cooperatives.zone.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="cooperatives.id"
          :to="{ name: 'CooperativesEdit', params: { cooperativesId: cooperatives.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./cooperatives-details.component.ts"></script>
