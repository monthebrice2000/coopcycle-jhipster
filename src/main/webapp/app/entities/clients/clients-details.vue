<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="clients">
        <h2 class="jh-entity-heading" data-cy="clientsDetailsHeading">
          <span v-text="$t('coopcycleJhipsterApp.clients.detail.title')">Clients</span> {{ clients.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.clients.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ clients.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.clients.prenom')">Prenom</span>
          </dt>
          <dd>
            <span>{{ clients.prenom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.clients.email')">Email</span>
          </dt>
          <dd>
            <span>{{ clients.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.clients.phoneNumber')">Phone Number</span>
          </dt>
          <dd>
            <span>{{ clients.phoneNumber }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleJhipsterApp.clients.restaurateur')">Restaurateur</span>
          </dt>
          <dd>
            <div v-if="clients.restaurateur">
              <router-link :to="{ name: 'RestaurateursView', params: { restaurateursId: clients.restaurateur.id } }">{{
                clients.restaurateur.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="clients.id" :to="{ name: 'ClientsEdit', params: { clientsId: clients.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./clients-details.component.ts"></script>
