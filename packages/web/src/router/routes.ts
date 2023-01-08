const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Домашняя страница',
    },
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
    children: [
      {
        path: 'list',
        name: 'Spell list',
        component: () => import('@/pages/SpellList.vue'),
      },
    ],
  },
  {
    path: '/*',
    redirect: { name: 'home' },
  },
];

export default routes;
