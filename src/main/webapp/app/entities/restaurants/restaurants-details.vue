<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="restaurants">
        <h2 class="jh-entity-heading" data-cy="restaurantsDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.restaurants.detail.title')">Restaurants</span> {{ restaurants.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurants.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ restaurants.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurants.carte')">Carte</span>
          </dt>
          <dd>
            <span>{{ restaurants.carte }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurants.menu')">Menu</span>
          </dt>
          <dd>
            <span>{{ restaurants.menu }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.restaurants.restaurateur')">Restaurateur</span>
          </dt>
          <dd>
            <div v-if="restaurants.restaurateur">
              <router-link :to="{ name: 'RestaurateursView', params: { restaurateursId: restaurants.restaurateur.id } }">{{
                restaurants.restaurateur.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="restaurants.id"
          :to="{ name: 'RestaurantsEdit', params: { restaurantsId: restaurants.id } }"
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

<script lang="ts" src="./restaurants-details.component.ts"></script>
