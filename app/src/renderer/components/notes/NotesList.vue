<template>
  <div id="notes-list">
    <v-list>
      <v-subheader v-text="title"></v-subheader>
      <v-list-tile v-for="note in this.notes" v-bind:key="note.text | capitalize" @click="updateActiveNote(note)">
        <v-list-tile-content>
          <v-list-tile-title :class="{active: activeNote === note}">{{note.text | capitalize | short}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: 'Notas'
    }
  },
  computed: {
    ...mapGetters([
      'notes',
      'activeNote'
    ])
  },
  methods: {
    updateActiveNote(note) {
      this.$store.dispatch('updateActive', note)
    }
  },
  filters: {
    short(value) {
      if (value.length == 0) {
        return "Nota vacia"
      } else if (value.length < 15) {
        return value
      } else {
        return value.substring(0, 15) + "..."
      }
    }
  }
}
</script>

<style scoped>
.active {
  font-weight:bold;
}

#notes-list {
  float: left;
  width: 100%;
  max-height: 80vh;
  overflow: auto;
}



.list-group-item-heading {
  font-weight: 300;
  font-size: 20px;
  padding: 4px;
  text-align: center;
  min-height: 21pt;
  border-bottom: 1px solid lightgray
}
</style>
