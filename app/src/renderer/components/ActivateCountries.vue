<template>
  <v-layout row wrap>
    <v-flex>
      <div class="lista"> 
        <h2>Activa y desactiva países</h2>
        <v-btn success @click="setAllTrue()">Todos participan</v-btn>
        <v-btn error @click="setAllFalse()">Ninguno participa</v-btn>
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
  height:85vh;
  overflow:auto;  
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
      this.allCountries.forEach(pais => pais.participa = false)
    },
    setAllTrue() {
      this.allCountries.forEach(pais => pais.participa = true)
    } 
  }
}
</script>
