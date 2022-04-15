<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="commandes">
        <h2 class="jh-entity-heading" data-cy="commandesDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.commandes.detail.title')">Commandes</span> {{ commandes.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.commandes.estPret')">Est Pret</span>
          </dt>
          <dd>
            <span>{{ commandes.estPret }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.commandes.estPaye')">Est Paye</span>
          </dt>
          <dd>
            <span>{{ commandes.estPaye }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.commandes.client')">Client</span>
          </dt>
          <dd>
            <div v-if="commandes.client">
              <router-link :to="{ name: 'ClientsView', params: { clientsId: commandes.client.id } }">{{ commandes.client.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.commandes.restaurant')">Restaurant</span>
          </dt>
          <dd>
            <span v-for="(restaurant, i) in commandes.restaurants" :key="restaurant.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'RestaurantsView', params: { restaurantsId: restaurant.id } }">{{ restaurant.id }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="commandes.id"
          :to="{ name: 'CommandesEdit', params: { commandesId: commandes.id } }"
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

<script lang="ts" src="./commandes-details.component.ts"></script>
