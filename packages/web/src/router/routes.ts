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
    path: '/armor',
    name: 'ArmorList',
    components: {
      default: () => import('@/pages/ArmorList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'ArmorView',
        components: {
          listContentView: () => import('@/pages/ArmorView.vue'),
        },
      },
    ],
  },
  {
    path: '/weapon',
    name: 'WeaponList',
    components: {
      default: () => import('@/pages/WeaponList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'WeaponView',
        components: {
          listContentView: () => import('@/pages/WeaponView.vue'),
        },
      },
    ],
  },
  {
    path: '/equipment',
    name: 'EquipmentList',
    components: {
      default: () => import('@/pages/EquipmentList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'EquipmentView',
        components: {
          listContentView: () => import('@/pages/EquipmentView.vue'),
        },
      },
    ],
  },
  {
    path: '/magic-items',
    name: 'MagicItemList',
    components: {
      default: () => import('@/pages/MagicItemList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'MagicItemView',
        components: {
          listContentView: () => import('@/pages/MagicItemView.vue'),
        },
      },
    ],
  },
  {
    path: '/races',
    name: 'RaceList',
    components: {
      default: () => import('@/pages/RaceList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'RaceView',
        components: {
          listContentView: () => import('@/pages/RaceView.vue'),
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
    path: '/classes',
    name: 'ClassList',
    components: {
      default: () => import('@/pages/ClassList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'ClassView',
        components: {
          listContentView: () => import('@/pages/ClassView.vue'),
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
