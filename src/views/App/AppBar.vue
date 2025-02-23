<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="handleNavigation"></v-app-bar-nav-icon
      ><!--   -->
      <v-app-bar-title> Panel Admin </v-app-bar-title>
    </template>
  </v-app-bar>
</template>
<script setup>
//import { ref } from 'vue';
import { useApp } from '../../stores/app.store'

const useAppStore = new useApp()

//const drawer = ref(useAppStore.showNavbar);

const handleNavigation = () => {
  useAppStore.showNavbar = !useAppStore.showNavbar
}
</script>
<style lang=""></style>
