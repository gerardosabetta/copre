<template>
  <v-layout row wrap>
    <v-flex xs5>
      <notes-list></notes-list>
    </v-flex>
    <v-flex xs6>
      <div class="editor-container">
        <editor v-if="activeNote"></editor>
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
import Editor from './notes/Editor'
import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'notes',
        'activeNote'
      ])
    },
    components: {
      Toolbar,
      NotesList,
      Editor
    }
  }
</script>

<style scoped>
  .editor-container {
    height: 650px
  }
</style>
