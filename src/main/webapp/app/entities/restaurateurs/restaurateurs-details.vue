<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="restaurateurs">
        <h2 class="jh-entity-heading" data-cy="restaurateursDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.restaurateurs.detail.title')">Restaurateurs</span> {{ restaurateurs.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurateurs.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ restaurateurs.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurateurs.prenom')">Prenom</span>
          </dt>
          <dd>
            <span>{{ restaurateurs.prenom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurateurs.city')">City</span>
          </dt>
          <dd>
            <span>{{ restaurateurs.city }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurateurs.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="restaurateurs.cooperative">
              <router-link :to="{ name: 'CooperativesView', params: { cooperativesId: restaurateurs.cooperative.id } }">{{
                restaurateurs.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="restaurateurs.id"
          :to="{ name: 'RestaurateursEdit', params: { restaurateursId: restaurateurs.id } }"
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

<script lang="ts" src="./restaurateurs-details.component.ts"></script>
