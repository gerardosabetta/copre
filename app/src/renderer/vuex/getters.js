let getters = {
  speakersList: state => state.speakersList,
  speakingCountry: state => state.speakingCountry,
  allCountries: state => state.paises,
  paisesParticipantes: state => state.paises.filter(paises => paises.participa),
  paisesPresentes: (state, getters) => getters.paisesParticipantes.filter(paises => paises.isPresent),
  nonObservers: (state, getters) => getters.paisesPresentes.filter(pais => !pais.observer),
  Observers: (state, getters) => getters.paisesPresentes.filter(pais => pais.observer),
  activeCountry: state => state.activeCountry,
  notes: state => state.notes,
  organoName: state => state.organoName,
  topicName: state => state.topicName,
  activeNote: state => state.activeNote,
  activeNoteText: state => state.activeNote.text,
  mayoriaCalificada: (state, getters) => Math.round(getters.nonObservers.length * 0.666667),
  mayoriaAbsoluta: (state, getters) => Math.round((getters.nonObservers.length / 2)) + 1,
  questions: state => state.questions,
  getCurrentSpeakerQuestions: (state, getters) => state.questions.filter(question => question.receptor == getters.speakingCountry.name)
}

export default getters