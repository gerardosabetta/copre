<template>
  <v-layout row wrap>
    <v-flex>
      <div class="lista"> 
        <h2>Activa y desactiva países</h2>
        <span @click="setAllFalse()"> All false</span>
        <v-btn success @click="changePresent('presente')">Todos participan</v-btn>
        <v-btn error @click="changePresent('ausente')">Ninguno participa</v-btn>
          <div v-for="pais in this.allCountries" :key="pais.name">
            <v-checkbox :label="pais.name" v-model="pais.participa"></v-checkbox>
          </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

</script>

<style scoped>

.lista {
  height:90vh;
  overflow:scroll
}
</style>

<script>
import { mapGetters } from 'vuex'
import store from '../vuex/store.js'
export default {
  computed: {
    ...mapGetters([
      'allCountries'
    ])
  },
  methods: {
    setAllFalse() {
      this.allCountries.map(pais => pais.participa = false)
    } 
  }
}
</script>
