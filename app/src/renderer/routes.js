import Home from './views/Home'
import Vote from './views/Vote'
import Admin from './views/Admin'
import Speakers from './views/speakers/Speakers'
import Notes from './views/notes/Notes'
import Resumen from './views/Resumen'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/oradores',
    component: Speakers
  },
  {
    path: '/notes',
    component: Notes
  },
  {
    path: '/vote',
    component: Vote
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/resumen',
    component: Resumen
  },
  {
    path: '*',
    redirect: '/'
  }
]
