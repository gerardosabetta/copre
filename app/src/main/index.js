'use strict'

import { app, BrowserWindow, Notification } from 'electron'

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
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.setMenu(null)  //No menues
  mainWindow.loadURL(winURL)
  
  mainWindow.once('ready-to-show',() => mainWindow.show())
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
