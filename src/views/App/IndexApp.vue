<template>
  <v-app>
    <NavigationBar />

    <AppBar />

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from './AppBar.vue'
import NavigationBar from './NavigationBar.vue'
</script>
<style lang=""></style>
