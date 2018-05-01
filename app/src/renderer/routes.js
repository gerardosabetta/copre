export default [
  {
    path: '/',
    name: 'home',
    component: require('components/Home')
  },
  {
    path: '/oradores',
    component: require('components/speakers/Speakers')
  },
  {
    path: '/notes',
    component: require('components/Notes')
  },
  {
    path: '/vote',
    component: require('components/Vote')
  },
  {
    path: '/admin',
    component: require('components/Admin')
  },
  {
    path: '/resumen',
    component: require('components/Resumen')
  },
  {
    path: '*',
    redirect: '/'
  }
]
