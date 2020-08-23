<template>
  <div id="note-editor">
      <v-text-field
        v-model="activeNote.title"
        label="Título"
      ></v-text-field>
    <wysiwyg v-model="activeNote.text" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'activeNote'
      ])
    }
  }
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

  ::selection {
    background:red;
  }

</style>
