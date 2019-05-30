<template> 
    <div>
        <v-switch @change="clearAbstence()" v-bind:label="`Votación ${formal ? 'formal' : 'informal' }`" v-model="formal"></v-switch>
        <v-layout row wrap>
            <v-flex>
                <h2>A favor</h2>
                <div class="contador">{{this.agree}}</div> 
                <div>
                    <v-btn 
                    small color="error" @click="decAgree()">
                        <v-icon>remove</v-icon>
                    </v-btn>
                    <v-btn 
                    small color="success" @click="incAgree()"> 
                        <v-icon>add</v-icon>
                    </v-btn>
                </div>
            </v-flex>

            <v-flex v-if="formal">
                <h2>Abstención</h2>
                <div class="contador">{{this.abstence}}</div>
                <div>
                    <v-btn 
                    small color="error" @click="decAbstence()">
                        <v-icon>remove</v-icon>
                    </v-btn>
                    <v-btn 
                    small color="success" @click="incAbstence()"> 
                        <v-icon>add</v-icon>
                    </v-btn>
                </div>
            </v-flex>
            <v-flex>
                <h2>En contra</h2>
                <div class="contador">{{this.decline}}</div>
                <div>
                    <v-btn 
                    small color="error" @click="decDecline()">
                        <v-icon>remove</v-icon>
                    </v-btn>
                    <v-btn 
                    small color="success" @click="incDecline()"> 
                        <v-icon>add</v-icon>
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex>
                <span class="number">{{this.total}} de {{this.$store.getters.paisesPresentes.length}}</span> delegaciones han votado.
                <div class="mayoria">Mayoría Calificada {{this.$store.getters.mayoriaCalificada}} / Mayoría Absoluta {{this.$store.getters.mayoriaAbsoluta}}</div>
                <v-flex offset-xs10>
                <v-btn 
                small color="error" @click="reset()"> 
                    reset
                </v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            agree:0,
            decline:0,
            abstence:0,
            formal:true
        }
    },
    methods: {
        incAgree() {
            if (this.total < this.$store.getters.paisesPresentes.length) this.agree++
        },
        incDecline() {
            if (this.total < this.$store.getters.paisesPresentes.length) this.decline++
        },
        incAbstence() {
            if (this.total < this.$store.getters.paisesPresentes.length) this.abstence++
        },
        decAgree() {
            if (this.agree) this.agree--
        },
        decDecline() {
            if (this.decline) this.decline--
        },
        decAbstence() {
            if(this.abstence) this.abstence--
        },
        reset() {
            this.agree = 0
            this.decline = 0
            this.abstence = 0
        },
        clearAbstence() {
            !this.formal ? this.abstence = 0 : ''
        }
    },
    computed: {
        total() {
         return this.agree + this.decline + this.abstence    
        }
    }
}
</script>

<style scoped>
    .contador {
        padding:30px;
        text-align:center;
        font-size:28pt;
    }

    .el-col {
        border:1px solid #ccc;
        padding:4px;
    }
    
    h2 {
        text-align:center;
    }

    .number {
        display:block;
        margin:0 auto;
        font-size:32pt;
    }
    
    .info {
        font-size:18pt;
        display:block;
        text-align:center;
        margin:0 auto;
    }

    .mayoria {
        font-size:12pt;
    }

    .reset {
        font-size: 10pt;
        cursor:pointer;
        display:inline
    }
    
</style>
