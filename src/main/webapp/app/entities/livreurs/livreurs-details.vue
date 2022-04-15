<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="livreurs">
        <h2 class="jh-entity-heading" data-cy="livreursDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.livreurs.detail.title')">Livreurs</span> {{ livreurs.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.livreurs.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ livreurs.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.livreurs.prenom')">Prenom</span>
          </dt>
          <dd>
            <span>{{ livreurs.prenom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.livreurs.city')">City</span>
          </dt>
          <dd>
            <span>{{ livreurs.city }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.livreurs.restaurateur')">Restaurateur</span>
          </dt>
          <dd>
            <div v-if="livreurs.restaurateur">
              <router-link :to="{ name: 'RestaurateursView', params: { restaurateursId: livreurs.restaurateur.id } }">{{
                livreurs.restaurateur.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.livreurs.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="livreurs.cooperative">
              <router-link :to="{ name: 'CooperativesView', params: { cooperativesId: livreurs.cooperative.id } }">{{
                livreurs.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="livreurs.id" :to="{ name: 'LivreursEdit', params: { livreursId: livreurs.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./livreurs-details.component.ts"></script>
