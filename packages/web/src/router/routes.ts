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
    name: 'SpellList',
    components: {
      default: () => import('@/pages/SpellList.vue'),
      mobileAdditionalMenu: () => import('@/components/spell/MobileAdditionalMenu/SpellMobileAdditionalMenu.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'SpellView',
        components: {
          listContentView: () => import('@/pages/SpellView.vue'),
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: { name: 'home' },
  },
];

export default routes;
