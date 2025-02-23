<template>
  <v-app>
    <v-container class="d-flex align-center justify-center fill-height">
      <!-- Quiero centrar el contenido de este componente -->
      <v-row class="d-flex align-center justify-center fill-height">
        <v-col class="d-flex align-center justify-center">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup></script>
<style></style>
