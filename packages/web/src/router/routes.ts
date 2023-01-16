const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Домашняя страница',
    },
  },
  {
    path: '/pc',
    name: 'PC',
  },
  {
    path: '/npc',
    name: 'NPC',
  },
  {
    path: '/location',
    name: 'Location',
  },
  {
    path: '/organisaion',
    name: 'Organisaion',
  },
  {
    path: '/bestiary',
    name: 'Bestiary',
  },
  {
    path: '/events',
    name: 'Events',
  },
  {
    path: '/quest',
    name: 'Quest',
  },
  {
    path: '/spells',
    name: 'Spells',
    components: {
      default: () => import('@/pages/SpellDefault.vue'),
      mobileAdditionalMenu: () => import('@/components/spell/MobileAdditionalMenu/SpellMobileAdditionalMenu.vue'),
    },
    children: [
      {
        path: 'list',
        name: 'SpellList',
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
