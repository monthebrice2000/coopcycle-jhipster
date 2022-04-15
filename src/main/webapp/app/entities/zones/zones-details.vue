<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="zones">
        <h2 class="jh-entity-heading" data-cy="zonesDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.zones.detail.title')">Zones</span> {{ zones.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.zones.ville')">Ville</span>
          </dt>
          <dd>
            <span>{{ zones.ville }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.zones.metropole')">Metropole</span>
          </dt>
          <dd>
            <span>{{ zones.metropole }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.zones.communaute')">Communaute</span>
          </dt>
          <dd>
            <span>{{ zones.communaute }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="zones.id" :to="{ name: 'ZonesEdit', params: { zonesId: zones.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./zones-details.component.ts"></script>
