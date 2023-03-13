const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Common/HomePage.vue'),
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
    path: '/User',
    name: 'User',
    components: {
      default: () => import('@/pages/Common/UserInfo.vue'),
    },
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/bestiary',
    name: 'BestiaryList',
    components: {
      default: () => import('@/pages/Bestiary/BestiaryList.vue'),
      mobileAdditionalMenu: () => import('@/components/bestiary/MobileAdditionalMenu/BeastMobileAdditionalMenu.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'BestiaryView',
        components: {
          listContentView: () => import('@/pages/Bestiary/BestiaryView.vue'),
        },
      },
    ],
  },
  {
    path: '/armor',
    name: 'ArmorList',
    components: {
      default: () => import('@/pages/Equipment/ArmorList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'ArmorView',
        components: {
          listContentView: () => import('@/pages/Equipment/ArmorView.vue'),
        },
      },
    ],
  },
  {
    path: '/campaign',
    name: 'CampaignList',
    components: {
      default: () => import('@/pages/Campaign/CampaignList.vue'),
    },
  },
  {
    path: '/campaign/create',
    name: 'CampaignCreate',
    components: {
      default: () => import('@/pages/Campaign/CampaignCreate.vue'),
    },
  },
  {
    path: '/campaign/:id',
    name: 'QuestList',
    components: {
      default: () => import('@/pages/Quest/QuestList.vue'),
    },
  },
  {
    path: '/campaign/:id/quests/create',
    name: 'CreateQuest',
    components: {
      default: () => import('@/pages/Quest/QuestCreate.vue'),
    },
  },
  {
    path: '/campaign/:id/quests/:questId',
    name: 'QuestEpisodeList',
    components: {
      default: () => import('@/pages/Quest/QuestEpisodeList.vue'),
    },
  },
  {
    path: '/campaign/:id/quests/:questId/create',
    name: 'QuestEpisodeCreate',
    components: {
      default: () => import('@/pages/Quest/QuestEpisodeCreate.vue'),
    },
  },
  {
    path: '/campaign/:id/quests/:questId/:episodeId',
    name: 'QuestView',
    components: {
      default: () => import('@/pages/Quest/QuestEpisodeView.vue'),
    },
    meta: {
      tabs: true,
    },
    children: [
      {
        path: 'index',
        name: 'ViewQuestGeneralInfo',
        components: {
          tabContent: () => import('@/components/quest/QuestGeneralInfo.vue'),
        },
        meta: {
          tabName: 'General info',
        },
      },
      {
        path: 'npc',
        name: 'ViewQuestNPCs',
        components: {
          tabContent: () => import('@/components/quest/QuestGeneralInfo.vue'),
        },
        meta: {
          tabName: 'NPC',
        },
      },
      {
        path: 'mobs',
        name: 'ViewQuestMobs',
        components: {
          tabContent: () => import('@/components/quest/QuestGeneralInfo.vue'),
        },
        meta: {
          tabName: "Mob's",
        },
      },
      {
        path: 'spells',
        name: 'ViewQuestSpells',
        components: {
          tabContent: () => import('@/components/quest/QuestGeneralInfo.vue'),
        },
        meta: {
          tabName: 'Spell',
        },
      },
      {
        path: 'organisations',
        name: 'ViewQuestOrganisations',
        components: {
          tabContent: () => import('@/components/quest/QuestGeneralInfo.vue'),
        },
        meta: {
          tabName: 'Organisations',
        },
      },
      {
        path: 'locations',
        name: 'ViewQuestLocations',
        components: {
          tabContent: () => import('@/components/quest/QuestGeneralInfo.vue'),
        },
        meta: {
          tabName: 'Locations',
        },
      },
    ],
  },
  {
    path: '/weapon',
    name: 'WeaponList',
    components: {
      default: () => import('@/pages/Equipment/WeaponList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'WeaponView',
        components: {
          listContentView: () => import('@/pages/Equipment/WeaponView.vue'),
        },
      },
    ],
  },
  {
    path: '/equipment',
    name: 'EquipmentList',
    components: {
      default: () => import('@/pages/Equipment/EquipmentList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'EquipmentView',
        components: {
          listContentView: () => import('@/pages/Equipment/EquipmentView.vue'),
        },
      },
    ],
  },
  {
    path: '/magic-items',
    name: 'MagicItemList',
    components: {
      default: () => import('@/pages/Equipment/MagicItemList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'MagicItemView',
        components: {
          listContentView: () => import('@/pages/Equipment/MagicItemView.vue'),
        },
      },
    ],
  },
  {
    path: '/races',
    name: 'RaceList',
    components: {
      default: () => import('@/pages/Race/RaceList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'RaceView',
        components: {
          listContentView: () => import('@/pages/Race/RaceView.vue'),
        },
      },
    ],
  },
  {
    path: '/dictionaries',
    name: 'DictionaryList',
    component: () => import('@/pages/Dictionary/DictionaryList.vue'),
  },
  {
    path: '/dictionaries/:id',
    name: 'DictionaryView',
    component: () => import('@/pages/Dictionary/DictionaryView.vue'),
  },
  {
    path: '/rules',
    name: 'RulesList',
    component: () => import('@/pages/Rule/RulesList.vue'),
  },
  {
    path: '/rules/:id',
    name: 'RulesView',
    component: () => import('@/pages/Rule/RulesView.vue'),
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
      default: () => import('@/pages/Spell/SpellList.vue'),
      mobileAdditionalMenu: () => import('@/components/spell/MobileAdditionalMenu/SpellMobileAdditionalMenu.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'SpellView',
        components: {
          listContentView: () => import('@/pages/Spell/SpellView.vue'),
        },
      },
    ],
  },
  {
    path: '/classes',
    name: 'ClassList',
    components: {
      default: () => import('@/pages/Class/ClassList.vue'),
    },
    children: [
      {
        path: ':id',
        name: 'ClassView',
        components: {
          listContentView: () => import('@/pages/Class/ClassView.vue'),
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
