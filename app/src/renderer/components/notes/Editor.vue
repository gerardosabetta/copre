<template>
  <div id="note-editor">
    <textarea
      :value="this.$store.getters.activeNoteText"
      @input="editNote"
      class="form-control"
      placeholder="Escribí acá tu nota">
    </textarea>
  </div>
</template>

<script>

  export default {
    methods: {
      editNote(note) {
        console.log(note)
        this.$store.dispatch('editNote',note.target.value)
      }
    }
  }
</script>

<style scoped>
  #note-editor {
    float:left;
    width:100%;
  }

  #note-editor textarea {
    width:100%;
    resize:none;
    height:600px;
    font-size:24pt;
  }
  
  ::selection {
    background:red;
  }
</style>
