<template>
  <v-layout row wrap>
    <v-flex>
      <h2>Activa y desactiva países</h2>
      <v-text-field
        v-model="searchTerm"
        label="Buscar un país"
        prepend-icon="search"
        width="30%"
      ></v-text-field>
      <v-btn color="success" @click="setAllTrue()">Todos participan</v-btn>
      <v-btn color="error" @click="setAllFalse()">Ninguno participa</v-btn>

      <div class="lista">
        <div v-for="pais in this.filteredCountries" :key="pais.name">
          <v-checkbox :label="pais.name" v-model="pais.participa"></v-checkbox>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>

.lista {
  height: 50vh;
  overflow:auto;
}
</style>

<script>
import { mapGetters } from 'vuex'
import store from '../vuex/store.js'
export default {
  data: () => {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapGetters([
      'allCountries'
    ]),
      filteredCountries() {
      return this.allCountries.filter(country => {
          return country.name.toLowerCase().match(this.searchTerm.toLowerCase())
      })
    }
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
