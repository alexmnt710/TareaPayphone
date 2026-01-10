// ./src/stores/Load/load.ts
import { defineStore } from 'pinia'
// This store is used to manage the loading state of the application

export const Load = defineStore('load', {
  state: () => ({
    loadScreen: false,
    loadComponent: false,
    loadPetition: false,

  }),
  actions: {
    
  }
})
