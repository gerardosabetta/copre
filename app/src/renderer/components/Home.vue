<template>
  <v-layout row>
    <v-flex xs6>
      <v-card flat>
        <v-subheader>Paises participantes</v-subheader>
        <v-list class="paisescontainer">
          <v-list-tile v-for="pais in this.paisesParticipantes" v-bind:key="pais.name | capitalize" @click="updateActiveCountry(pais)">
            <v-list-tile-content>
              <v-list-tile-title :class="{active: pais === activeCountry, presente: pais.isPresent, ausente: !pais.isPresent }" v-text="pais.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-flex xs12>
              <v-card-title primary-title>
                <div v-if="!editing">
                  <div class="headline">{{organoName ? organoName : 'Ingrese el nombre del órgano'}}</div>
                  <p class="text-xs-left">{{topicName ? topicName : 'Ingrese el nombre del tópico'}}</p>
                </div>
                <v-flex v-else>
                  <v-form>
                      <v-text-field label="Nombre del órgano" :value="organoName" @input="setOrgano"></v-text-field>
                      <v-text-field label="Nombre del tópico" :value="topicName" @input="setTopic"></v-text-field>
                  </v-form>
                </v-flex>
              </v-card-title>
              <v-card-text>
                Total {{ this.paisesPresentes.length }} de {{ this.paisesParticipantes.length }} <br>
                  <div>Mayoría Calificada {{ this.mayoriaCalificada }} </div>
                  <div>Mayoría Absoluta {{ this.mayoriaAbsoluta }} </div>
              </v-card-text>
            </v-flex>
            <v-card-actions>
              <v-btn icon @click="toggleEditing">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-tooltip bottom>
                <v-btn icon slot="activator">
                  <v-icon>help</v-icon>
                </v-btn>
                <span>
                  <p>La Mayoría Calificada representa el voto de dos tercios (66,6%) de los miembros presentes</p>
                  <p>La Mayoría Absoluta representa el voto de la mitad más un miembro (50% + 1) de los miembros presentes</p>
                </span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 class="active-country">
          <h1>
            {{ this.activeCountry.name | capitalize }}
          </h1>
        </v-flex>
        <v-flex xs12>
          <v-btn success @click="changePresent('presente')">Presente</v-btn>
          <v-btn error @click="changePresent('ausente')">Ausente</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      editing: false
    }
  },
  computed: {
    ...mapGetters([
      'paisesParticipantes',
      'paisesPresentes',
      'activeCountries',
      'activeCountry',
      'organoName',
      'topicName',
      'mayoriaAbsoluta',
      'mayoriaCalificada'
    ])
  },
  methods: {
    updateActiveCountry(val) {
      this.$store.dispatch('updateActiveCountry', val)
    },
    changePresent(type) {
      this.$store.dispatch('changePresent', type)
    },
    setTopic(payload) {
      this.$store.dispatch('setTopic', payload)
    },
    setOrgano(payload) {
      this.$store.dispatch('setOrgano', payload)
    },
    toggleEditing() {
      this.editing = !this.editing
    },
  }
}
</script>

<style scoped lang="scss">
  .pais {
    padding: 4px;
    text-align: center;
    border: 1px solid #dfe6ec;
  }

  .active {
    font-weight: bold;
  }

  .input-name::selection {
    background: lightblue
  }

  .presente {
    color: green;
  }

  .ausente {
    color: red
  }

  .paisescontainer {
    max-height: 75vh;
    overflow-y: auto;
  }
  
  .active-country {
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
    max-width: 100%;
    min-height: 1.1em;
    max-height: 100%;
    word-wrap: unset;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  }

</style>

