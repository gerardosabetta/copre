<template>
    <div>
        <v-layout row wrap>
            <v-flex xs10>
                <v-text-field
                    v-model="searchTerm"
                    label="Buscar un país"
                    prepend-icon="search"
                    width="30%"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-list class="speakers-container">
            <v-list-tile v-for="pais in this.filteredSpeakers" v-bind:key="pais.name | capitalize" @click="addSpeaker(pais)" @click.native="dialog = true">
                <v-list-tile-content>
                    <v-list-tile-title v-text="pais.name"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash'
export default {
    data() {
        return {
            searchTerm: ''
        }
    },
    computed: {
        ...mapGetters([
            'paisesPresentes',
            'speakersList',
        ]),
        possibleSpeakers() {
            return _.differenceBy(this.paisesPresentes, this.speakersList, 'name')
        },
        filteredSpeakers() {
            return this.possibleSpeakers.filter(country=> {
                return country.name.toLowerCase().match(this.searchTerm.toLowerCase())
            })
        }

    },
    methods: {
        addSpeaker(country) {
            this.$store.dispatch('addSpeaker', country)
        },
    }
}
</script>

<style>
.speakers-container {
  max-height: 600px;
  overflow-y: auto;
}
</style>
