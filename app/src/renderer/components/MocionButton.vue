<template>
    <v-dialog v-model="mocionDialog" width="500px">
        <v-btn icon dark slot="activator">
            <v-icon>priority_high</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <div class="headline">¿Quién hizo la moción?</div>
            </v-card-title>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field v-model="searchTerm" label="Buscar un país" prepend-icon="search" width="30%"></v-text-field>
                    </v-flex>
                </v-layout>
                <div class="fixed-height">
                    <v-list>
                        <v-list-tile v-for="pais in this.filteredSpeakers" v-bind:key="pais.name | capitalize" @click.native="dialog = true">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{pais.name}} - {{pais.motions}}
                                </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple @click="updateStatus({type: 'minus', country: pais})">
                                    <v-icon>remove</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-action>
                                <v-btn icon ripple @click="updateStatus({type: 'plus', country: pais})">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </div>
                <v-card-actions class="white">
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.native="mocionDialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            searchTerm: '',
            mocionDialog: false,
        }
    },
    computed: {
        ...mapGetters([
            'paisesPresentes'
        ]),
        filteredSpeakers() {
            return this.paisesPresentes.filter(country => {
                return country.name.toLowerCase().match(this.searchTerm.toLowerCase())
            })
        }
    },
    methods: {
        updateStatus(incDec, country) {
            this.$store.dispatch('updateStatus', incDec, country)
        }
    }
}
</script>
<style>
.fixed-height {
    height:30vh;
    overflow: auto;
}
</style>
