import uuidv4 from '../../utils';

let mutations = {
  MODIFY_SPEECH(state, payload) {
    payload.speech ? payload.country.speech = true : payload.country.speech = false
  },
  UPDATE_STATUS(state, payload) {
    if (payload.type === 'plus') {
      payload.country.motions++
    } else if (payload.type === 'minus') {
      payload.country.motions > 0 ? payload.country.motions-- : ''
    }
  },
  CHANGE_PRESENT(state, payload) {
    if (payload === "presente") {
      state.activeCountry.isPresent = true
    } else {
      state.activeCountry.isPresent = false
    }
    let paisesQueParticipan = state.paises.filter(paises => paises.participa) // TODO: this really needs to get refactored
    let activeIndex = paisesQueParticipan.indexOf(state.activeCountry)
    console.log(activeIndex)
    console.log(state.paises.length)
    console.log('presentes' + paisesQueParticipan.length)
    if (activeIndex + 1 !== paisesQueParticipan.length) {
      state.activeCountry = paisesQueParticipan[activeIndex + 1]
    }
  },
  SET_SPEECH(state, payload) {
    if (payload === "left") {
      if (state.activeCountry.speech != 0) {
        state.activeCountry.speech--
      }
    } else {
      if (state.activeCountry.speech != 2) {
        state.activeCountry.speech++
      }
    }
  },
  SET_ACTIVE_COUNTRY(state, country) {
    state.activeCountry = country
  },
  SET_SPEAKING_COUNTRY(state, country) {
    state.speakingCountry = country
  },

  //Notes
  ADD_NOTE(state) {
    const newNote = {
      text: 'Nueva nota',
      title: 'Sin título',
      uuid: uuidv4(),
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },

  EDIT_NOTE(state, text) {
    state.activeNote.text = text
  },

  DELETE_NOTE(state) {
    let index = state.notes.indexOf(state.activeNote);
    state.notes.splice(index, 1)
    state.activeNote = state.notes[0]
  },
  SET_ACTIVE_NOTE(state, note) {
    state.activeNote = note
  },
  SET_TOPIC(state, payload) {
    state.topicName = payload
  },
  SET_ORGANO(state, payload) {
    state.organoName = payload
  },
  ADD_SPEAKER(state, payload) {
    state.speakersList.push(payload)
  },
  REMOVE_ACTIVE_SPEAKER(state) {
    let index = state.speakersList.indexOf(state.speakingCountry)
    state.speakersList.splice(index, 1)
    state.speakersList.length > 0 ? state.speakingCountry = state.speakersList[0] : state.speakingCountry = []
  },
  SORT_SPEAKERS(state, { list }) {
    state.speakersList = [...list]
  },
  ADD_QUESTION(state, payload) {
    state.questions.push({ emisor: payload.name, receptor: state.speakingCountry.name })
  },
  REMOVE_QUESTION(state, question) {
    let index = state.questions.indexOf(question)
    state.questions.splice(index, 1)
  },
  FINALIZED_SPEECH(state) {
    let index = state.speakersList.indexOf(state.speakingCountry)
    state.speakingCountry.speech = true
    state.speakersList.splice(index, 1)
    state.speakersList.length > 0 ? state.speakingCountry = state.speakersList[0] : state.speakingCountry = []
  }
}

export default mutations
