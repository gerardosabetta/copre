<template>
    <div class="timer-container">
        <time>
            {{this.minutes | twoDigits}}:{{this.seconds | twoDigits}}
        </time>
        <v-btn
          v-if="!running"
          flat
          icon
          @click="start()"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn
          v-else
          flat
          icon
          @click="stop()"
        >
          <v-icon>pause</v-icon>
        </v-btn>
        <v-btn
          flat
          icon
          @click="reset()"
        >
          <v-icon>refresh</v-icon>
        </v-btn>
    </div>
</template>

<script>
import Vue from 'vue'

Vue.filter('twoDigits', (value) => {
    if ( value.toString().length <= 1 ) {
        return '0'+value.toString()
    }
    return value.toString()
})

export default {
    mounted () {
      this.$root.$on('finalizedSpeech', () => {
        this.reset()
      })
    },
    data() {
        return {
            seconds:0,
            minutes:0,
            hours:0,
            running:false
        }
    },
    methods: {
        start() {
            if(!this.running) {
                this.add()
                this.running = true
            }
        },
        add() {
            this.seconds++;
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes++;
                if (this.minutes >= 60) {
                    this.minutes = 0;
                    this.hours++;
                }
            }
            this.timer()
        },
        timer() {
            this.t = setTimeout(this.add, 1000)
        },
        stop() {
            clearTimeout(this.t)
            this.running = false
        },
        reset() {
            this.seconds = 0
            this.minutes = 0
            this.hours = 0
            this.stop()
        }
    }
}
</script>

<style scoped>

</style>
