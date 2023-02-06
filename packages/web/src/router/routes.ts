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
    name: 'BestiaryList',
    components: {
      default: () => import('@/pages/BestiaryList.vue'),
      mobileAdditionalMenu: () => import('@/components/bestiary/MobileAdditionalMenu/BeastMobileAdditionalMenu.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'BestiaryView',
        components: {
          listContentView: () => import('@/pages/BestiaryView.vue'),
        },
      },
    ],
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
      mobileAdditionalMenu: () => import('@/components/beast/MobileAdditionalMenu/SpellMobileAdditionalMenu.vue'),
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
