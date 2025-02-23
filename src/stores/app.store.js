import { defineStore } from 'pinia'

export const useApp = defineStore('appstore', {
  state: () => ({
    showNavbar: true,
  }),

  actions: {
    async handlerShowNavbar() {
      this.showNavbar = !this.showNavbar
    },
  },
})
