<template>
  <div>
    <b-dropdown-item to="/zones">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.zones')">Zones</span>
    </b-dropdown-item>
    <b-dropdown-item to="/cooperatives">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.cooperatives')">Cooperatives</span>
    </b-dropdown-item>
    <b-dropdown-item to="/livreurs">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.livreurs')">Livreurs</span>
    </b-dropdown-item>
    <b-dropdown-item to="/restaurateurs">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.restaurateurs')">Restaurateurs</span>
    </b-dropdown-item>
    <b-dropdown-item to="/restaurants">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.restaurants')">Restaurants</span>
    </b-dropdown-item>
    <b-dropdown-item to="/clients">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.clients')">Clients</span>
    </b-dropdown-item>
    <b-dropdown-item to="/commandes">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.commandes')">Commandes</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
