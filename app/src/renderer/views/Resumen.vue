<template>
  <v-layout row wrap>
    <v-flex x12>
      <div class="resumen-container">
        <v-data-table v-bind:headers="headers" :items="paisesParticipantes" hide-actions class="elevation-1">
          <template slot="items" scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-center">{{ (questions.filter(question => question.emisor === props.item.name)).length }}</td>
            <td class="text-xs-center">{{ (questions.filter(question => question.receptor === props.item.name)).length }}</td>
            <td class="text-xs-center">{{ props.item.motions }}</td>
            <td class="text-xs-center">{{ props.item.speech ? 'Si' : 'No' }}</td>
          </template>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed:{
      ...mapGetters([
        'paisesParticipantes',
        'questions'
      ])
    },
    data () {
      return {
        headers: [
          {
            text: 'País',
            align: 'left',
            value: 'name'
          },
          { text: 'Preguntas', value: 'questions', sortable: false },
          { text: 'Respuestas', value: 'answers', sortable: false },
          { text: 'Mociones', value: 'motions' },
          { text: 'Discurso', value: 'speech' },
        ]
      }
    }
  }
</script>

<style scoped>
.resumen-container {
  height: 80vh;
  overflow-y: scroll;
}

</style>
