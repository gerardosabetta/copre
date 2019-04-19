'use strict'

import { app, BrowserWindow, Notification } from 'electron'
import { Sequelize } from 'sequelize'
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    icon:'../../icons/icon.ico',
    frame: false
  })
  mainWindow.setMenu(null)  //No menues
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('closed', () => {
  mainWindow = null
} )

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const connection = new Sequelize('testing', 'gera', 'gera', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
  operatorsAliases: false
})


const Country = connection.define('Country', {
  name: Sequelize.STRING,
  isParticipating: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isPresent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isObserver: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  questions: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  answers: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  motions: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  speeches: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})


connection
  .sync({
      logging: console.log,
      force: true
  })
  .then(() => {
      Country.create({
        name: 'Argentina',
      })
  })
  .then(() => {
      console.log('Connection correct')
  })
  .catch(err => {
      console.log(`Error: ${err}`)
  })
