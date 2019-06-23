<template>
  <div>
  <v-layout row wrap>
    <v-flex xs10>
      <ActivateCountries />
    </v-flex>
    <v-flex xs2>
      <v-btn flat @click="clearVuex()">Reiniciar todo</v-btn>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import ActivateCountries from '../components/ActivateCountries'
export default {
  components: {
  ActivateCountries
  },
  methods: {
    clearVuex() {
      localStorage.clear()
      location.reload()
    }
  }
  
}
</script>

<style scoped>


</style>
