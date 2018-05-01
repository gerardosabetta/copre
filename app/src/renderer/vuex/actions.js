let actions = {
  updateStatus(context, payload) {
    context.commit('UPDATE_STATUS', payload)
  },
  changePresent(context, type) {
    context.commit('CHANGE_PRESENT', type)
  },
  changeParticipation(context, type) {
    context.commit('CHANGE_PARTICIPATION', type)
  },
  updateActiveCountry(context, pais) {
    context.commit('SET_ACTIVE_COUNTRY', pais)
  },
  addNote(context) {
    context.commit('ADD_NOTE')
  },
  deleteNote(context) {
    context.commit('DELETE_NOTE')
  },
  updateActive(context, note) {
    context.commit('SET_ACTIVE_NOTE', note)
  },
  editNote(context, note) {
    context.commit('EDIT_NOTE', note)
  },
  setSpeech(context, given) {
    context.commit('SET_SPEECH', given)
  },
  setTopic(context, payload) {
    context.commit('SET_TOPIC', payload)
  },
  setOrgano(context, payload) {
    context.commit('SET_ORGANO', payload)
  },
  setSpeakingCountry(context, payload) {
    context.commit('SET_SPEAKING_COUNTRY', payload)
  },
  addSpeaker(context, country) {
    context.commit('ADD_SPEAKER', country)
  },
  removeActiveSpeaker(context) {
    context.commit('REMOVE_ACTIVE_SPEAKER')
  },
  addQuestion(context, country) {
    context.commit('ADD_QUESTION', country)
  },
  removeQuestion(context, question) {
    context.commit('REMOVE_QUESTION', question)
  },
  modifySpeech(context, payload) {
    context.commit('MODIFY_SPEECH', payload)
  },
  finalizedSpeech(context) {
    context.commit('FINALIZED_SPEECH')
  }
}

export default actions