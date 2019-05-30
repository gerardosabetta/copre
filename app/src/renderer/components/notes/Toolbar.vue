<template>
  <div class="toolbar-container">
     <v-speed-dial
      top
      right
      direction="bottom"
      transition="scale-transition"
    >
      <v-btn
        slot="activator"
        class="blue darken-2"
        dark
        fab
        v-model="fab"
      >
        <v-icon>note_add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="indigo"
        @click="addNote" 
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="red"
        v-if="notes.length"
        @click="deleteNote" 
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'notes'
    ])
  },
  methods: {
    addNote(state) {
      this.$store.dispatch('addNote', state)
    },
    deleteNote(state) {
      this.$store.dispatch('deleteNote', state)
    }
  },
  data() {
    return {
      fab: false
    }
  }

}

</script>
