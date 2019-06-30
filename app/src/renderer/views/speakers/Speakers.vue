<template>
    <v-layout row wrap>
        <v-flex xs8 class="full-height">
            <v-dialog
            v-model="addSpeakerDialog"
            width="50%"
            absolute
            scrollable>
                <v-btn success slot="activator">
                    <v-icon>add</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title primary-title>
                        <div class="headline">
                            Añadir delegaciones a la lista de oradores
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <add-speaker></add-speaker>
                    </v-card-text>
                    <v-card-actions class="white">
                        <v-spacer></v-spacer>
                        <v-btn
                        class="blue--text darken-1"
                        flat
                        @click.native="addSpeakerDialog = false">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
            v-model="removeSpeakerDialog"
            absolute>
                <v-btn error slot="activator" v-if="speakingCountry">
                    <v-icon>remove</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title primary-title>
                        ¿Estas seguro de eliminar a {{speakingCountry.name}}?
                    </v-card-title>
                    <v-card-text>
                        La delegación será removida de la lista de oradores pero las preguntas seguiran asociadas a la delegación!
                    </v-card-text>
                    <v-card-actions class="white">
                        <v-spacer></v-spacer>
                        <v-btn
                        class="blue--text darken-1"
                        flat
                        @click.native="removeActiveSpeaker(speakingCountry); removeSpeakerDialog = false"
                        >Si, eliminar</v-btn>
                        <v-btn
                        class="blue--text darken-1"
                        flat
                        @click.native="removeSpeakerDialog = false"
                        >Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div v-if="speakersList.length">
                <v-card>
                    <v-card-text>
                    <v-subheader>Lista de oradores</v-subheader>
                    <v-list class="speaker-list-container">
                        <draggable :list="list" class="dragArea">
                            <v-list-tile v-for="country in this.speakersList" v-bind:key="country.name" @click="setSpeakingCountry(country)">
                                <v-list-tile-content>
                                    <v-list-tile-title> {{country.name | capitalize}}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action v-if="country === speakingCountry">
                                    <v-btn icon>
                                        <v-icon>mic</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </draggable>
                    </v-list>
                    </v-card-text>
                </v-card>
            </div>
        </v-flex>
        <v-flex xs4 class="full-height">
            <h4 v-text="speakingCountry.name"></h4>
            <h6 v-if="getCurrentSpeakerQuestions.length > 0">{{speakingCountry.name}} fue interpelado por:</h6>
                <v-list class="list-container">
                    <v-list-tile v-for="(question, index) in getCurrentSpeakerQuestions" :key="index">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{question.emisor}}
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon ripple @click="removeQuestion(question)">
                            <v-icon>delete</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            <v-dialog
            v-model="addQuestionDialog"
            width="50%"
            absolute
            scrollable
            v-if="speakingCountry.name">
                <v-btn
                block
                success
                slot="activator">
                    Añadir interpelación
                </v-btn>
                <v-card>
                    <v-card-title primary-title>
                        <div class="headline">
                            Añadir interpelación
                        </div>
                    </v-card-title>
                    <v-card-text style="height:300px">
                        <add-question></add-question>
                    </v-card-text>
                    <v-card-actions class="white">
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text darken-1" flat @click.native="addQuestionDialog = false">Listo</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-btn
                error
                @click="finalizedSpeech(speakingCountry)"
                v-if="speakingCountry.name"
                >
                    Discurso finalizado
                </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import draggable from 'vuedraggable'
import AddSpeaker from './AddSpeaker'
import AddQuestion from './AddQuestion'
import {
    mapGetters
} from 'vuex'
export default {
    name: 'Speakers',
    data() {
        return {
            addSpeakerDialog: false,
            removeSpeakerDialog: false,
            addQuestionDialog: false
        }
    },
    computed: {
        ...mapGetters([
            'paisesPresentes',
            'questions',
            'speakersList',
            'activeCountry',
            'speakingCountry',
            'getCurrentSpeakerQuestions'
        ]),
        list: {
            get() {
                const self = this;

                const arrayChangeHandler = {
                    get(target, property) {
                        return target[property];
                    },
                    set(target, property, value) {
                        target[property] = value;

                        self.$store.commit({
                            type: 'SORT_SPEAKERS',
                            list: target,
                        });

                        return true;
                    },
                };

                return new Proxy([...this.speakersList], arrayChangeHandler)
            },
            set(newValue) {
                this.$store.commit({
                    type: 'SORT_SPEAKERS',
                    list: target,
                });
            },
        }
    },
    methods: {
        setSpeakingCountry(country) {
            this.$store.dispatch('setSpeakingCountry', country)
        },
        removeActiveSpeaker(speakingCountry) {
            this.$store.dispatch('removeActiveSpeaker')
            this.$store.dispatch('modifySpeech', {country:speakingCountry, speech: false})
        },
        setSpeech(given) {
            this.$store.dispatch('setSpeech', given)
        },
        updateStatus(payload, payload2) {
            this.$store.dispatch('updateStatus', payload)
        },
        removeQuestion(question) {
            this.$store.dispatch('removeQuestion', question)
        },
        finalizedSpeech(speakingCountry) {
            this.$store.dispatch('finalizedSpeech')
            this.$store.dispatch('modifySpeech', {country:speakingCountry, speech: true})
            this.$root.$emit('finalizedSpeech')
        }
    },
    components: {
        draggable,
        AddSpeaker,
        AddQuestion
    }
}
</script>

<style scoped>
.pais {
    padding: 4px;
    text-align: center;
    border: 1px solid #dfe6ec;
}

.active {
    font-weight: bold;
}

.scrollabe {
    overflow: scroll;
    height: 67vh;
    box-sizing: border-box;
}

p {
    margin: 4px 0;
    font-size: 21pt;
}

p i {
    padding: 0 4px;
}

.heading {
    text-align: center;
}

.cpanel {
    text-align: center;
}

.full-height {
    height: 80vh;
    overflow:auto;
}

.list-container {
    height: 20vh;
    overflow: auto;
}

.speaker-list-container {
    overflow: auto;
    max-height: 60vh;
}

</style>
