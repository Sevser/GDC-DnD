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
    path: '/dictionaries',
    name: 'DictionaryList',
    component: () => import('@/pages/DictionaryList.vue'),
  },
  {
    path: '/dictionaries/:id',
    name: 'DictionaryView',
    component: () => import('@/pages/DictionaryView.vue'),
  },
  {
    path: '/rules',
    name: 'RulesList',
    component: () => import('@/pages/RulesList.vue'),
  },
  {
    path: '/rules/:id',
    name: 'RulesView',
    component: () => import('@/pages/RulesView.vue'),
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
