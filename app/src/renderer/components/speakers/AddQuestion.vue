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
        <v-list>
            <v-list-tile v-for="pais in paisesPresentes" v-bind:key="pais.name | capitalize" @click="addQuestion(pais)" @click.native="dialog = true">
                <v-list-tile-content>
                    <v-list-tile-title v-text="pais.name"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            searchTerm: ''
        }
    },
    computed: {
        ...mapGetters([
            'paisesPresentes',
        ])
    },
    methods: {
        addQuestion(country) {
            this.$store.dispatch('addQuestion', country)
        }
    }
}
</script>

<style>

</style>
