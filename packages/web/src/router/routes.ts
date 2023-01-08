const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/pc',
    name: 'pc',
  },
  {
    path: '/npc',
    name: 'npc',
  },
  {
    path: '/location',
    name: 'location',
  },
  {
    path: '/organisaion',
    name: 'organisaion',
  },
  {
    path: '/bestiary',
    name: 'bestiary',
  },
  {
    path: '/events',
    name: 'events',
  },
  {
    path: '/quest',
    name: 'quest',
  },
  {
    path: '/spells',
    name: 'spells',
  },
  {
    path: '/*',
    redirect: { name: 'home' },
  },
];

export default routes;
