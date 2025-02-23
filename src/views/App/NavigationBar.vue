<template>
  <v-navigation-drawer floating temporary v-model="appStore.showNavbar">
    <v-list>
      <v-list-item>
        <img src="../../assets/oakland-logo.png" alt="High Power" class="img-banner" />
      </v-list-item>
    </v-list>
    <v-list density="compact" nav>
      <!-- HOME -->
      <v-list-item
        :prepend-icon="mdiHomeCircleOutline"
        title="Inicio"
        value="home"
        @click="goTo('dashboard')"
      ></v-list-item>
      <!-- PORTAL ADMIN -->
      <v-list-group value="PortalAdmin">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="mdiShieldCrown"
            title="Portal Admin"
          ></v-list-item>
        </template>
        <v-list-item
          :prepend-icon="mdiAccountGroup"
          title="Usuarios"
          value="portal_users"
          @click="goTo('users-portal-admin')"
        ></v-list-item>
      </v-list-group>
      <!-- ACTUAR -->
      <v-list-group value="ActuarSustentable">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="mdiTruckFastOutline"
            title="Actuar Sustentable"
          ></v-list-item>
        </template>
        <v-list-item
          :prepend-icon="mdiAccountGroup"
          title="Usuarios"
          value="actuar_users"
          @click="goTo('users-actuar-sustentable')"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiAccountGroup"
          title="Operadores"
          value="actuar_operators"
          @click="goTo('operators-actuar-sustentable')"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiSecurity"
          title="Permisos"
          value="actuar_permissions"
          @click="goTo('permissions-actuar-sustentable')"
        ></v-list-item>
      </v-list-group>
      <!-- SALESSOFT -->
      <v-list-group value="Salesoft">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="mdiCartArrowUp" title="Salesoft"></v-list-item>
        </template>
        <v-list-item
          :prepend-icon="mdiAccountTie"
          title="Vendedores"
          value="salesoft_salesmen"
          @click="goTo('users-actuar-sustentable')"
        ></v-list-item>
      </v-list-group>
      <!-- OTROS -->
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-home" title="Contacto" value="contacto"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script setup>
import {
  mdiShieldCrown,
  mdiAccountGroup,
  mdiHomeCircleOutline,
  mdiTruckFastOutline,
  mdiSecurity,
  mdiCartArrowUp,
  mdiAccountTie,
} from '@mdi/js'
import { useRouter } from 'vue-router'
//import { useAuthPortal } from '@/stores/auth'
import { useApp } from '@/stores/app.store'

const appStore = useApp()

const router = useRouter()
//const auth = useAuthPortal()

const goTo = (route) => {
  router.push({ name: route })
}

const logout = () => {
  auth.logout()
}
</script>
<style scoped>
.img-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
