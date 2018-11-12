<template>
  <v-layout row wrap>
    <v-flex xs5>
      <notes-list :notes="notes"></notes-list>
    </v-flex>
    <v-flex xs6>
      <div class="editor-container">
        <!-- <editor v-if="notes.length"></editor> -->
        <wysiwyg v-if="activeNote" v-model="note" />
        <div v-else>
          Selecciona o crea una nota
        </div>
      </div>
    </v-flex>
    <v-flex xs1>
      <toolbar></toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import Toolbar from './notes/Toolbar'
import NotesList from './notes/NotesList'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'notes',
      'activeNote'
    ]),
    note: {
      get () {
        return this.$store.getters.activeNote ? this.$store.getters.activeNote.text : null
      },
      set (value) {
        this.editNote(value)
      }
    }
  },
  components: {
    Toolbar,
    NotesList
  },
  methods: {
    editNote (value) {
      this.$store.dispatch('editNote', value)
    }
  },
  created () {
      this.$store.dispatch('updateActive', null)
  }
}
</script>

<style scoped>
.editor-container {
  height: 650px;
}
</style>
