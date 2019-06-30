<template>
  <v-app id="#app" toolbar>
    <header>
      <v-system-bar class="amber darken-4 system-bar"  window dark>
        <v-spacer></v-spacer>
        <v-icon @click="minimizeWindow()" class="option" >remove</v-icon>
        <v-icon @click="maximizeWindow()" class="option" >check_box_outline_blank</v-icon>
        <v-icon @click="closeWindow()" class="option" >close</v-icon>
      </v-system-bar>
      <v-navigation-drawer app
      v-model="drawer"
      light
      temporary
      enable-resize-watcher
      >
        <v-list dense class="options-list">
          <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar class="amber darken-4 toolbar" app dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Copre Alpha OAJNU Rosario</v-toolbar-title>
        <v-spacer></v-spacer>
        <Timer />
        <MocionButton />
      </v-toolbar>
    </header>
    <main class="router-view-container">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import store from 'renderer/vuex/store'
import Speakers from './views/speakers/Speakers'
import MocionButton from './components/MocionButton'
import Timer from './components/Timer'
const { remote } = require('electron')

export default {
  data() {
    return {
      drawer: false ,
      items: [
        { title: 'Asistencia', to: '/' },
        { title: 'Lista de oradores', to: 'oradores' },
        { title: 'Votacion', to: 'vote' },
        { title: 'Notas', to: 'notes' },
        { title: 'Resumen', to: 'resumen' },
        { title: 'Administrar', to: 'admin' }
      ]
    }
  },
  methods: {
    closeWindow () {
      let window = remote.getCurrentWindow()
      window.close()
    },
    minimizeWindow () {
      let window = remote.getCurrentWindow()
      window.minimize()
    },
    maximizeWindow () {
      let window = remote.getCurrentWindow()
      window.isMaximized() ? window.unmaximize() : window.maximize();
    }
  },
  store,
  components: {
    MocionButton,
    Timer
  }

}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:300);

* {
  margin: 0;
  padding: 0;
  user-select: none;
}

html,
body {
  height: 100%;
  overflow: auto;
}


.toolbar {
  top: 32px;
}

.options-list {
  margin-top: 32px;
}

.router-view-container {
  margin-top: 5vh;
}

.system-bar {
  -webkit-app-region: drag;
  .option {
    -webkit-app-region: no-drag;    
    cursor: pointer;
    color: #fff !important;
    font-weight: 400;
    &:hover {
      color:darken(#fff, 60%) !important; //Todo: remove important
    }
  }
}

</style>
