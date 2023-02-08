<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'SpellList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      <div class="text-h4">
        {{ spell.title }}
      </div>
    </template>
    <template #subtitle>
      <div class="d-flex flex-column">
        <div>{{ source }}</div>
        <div class="d-flex"><b>Класс:</b>{{ classes }}</div>
      </div>
    </template>
    <template #text>
      <div class="d-flex flex-column mb-2">{{ level }} {{ scoolOfMagic }} Ритуал</div>
      <div class="d-flex flex-column mb-2">
        <div class="d-flex mb-2">
          <div class="w-33 d-flex flex-column pr-4">
            <div class="text-subtitle-2">Наложение</div>
            <div>{{ actionTypeDescription }}</div>
          </div>
          <div class="w-33 d-flex flex-column pr-4 pl-4">
            <div class="text-subtitle-2">Дистанция</div>
            <div>{{ distanceContent }}</div>
          </div>
          <div class="w-33 d-flex flex-column pr-4 pl-4">
            <div class="text-subtitle-2">Длительность</div>
            <div>{{ lengthSpell }}</div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column mb-2">
        <div class="text-subtitle-2">Компоненты</div>
        <div class="mb-2">{{ components }} {{ spellComponentDescription }}</div>
      </div>
      <div class="d-flex flex-column mb-2">
        <div class="text-subtitle-2">Тип урона</div>
        <div class="mb-2">{{ damageType }}</div>
      </div>
      <div class="d-flex flex-column mb-2">
        <div class="mb-2" v-html="description"></div>
      </div>
      <div class="d-flex flex-column mb-2">
        <div class="mb-2" v-html="highLevelDescription"></div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { ICharacterClass } from '@/types/CharacterClass';
import { ISpell, Spell } from '@/types/Spell';
import { ISpellComponent } from '@/types/SpellComponent';
import { defineComponent } from 'vue';

export default defineComponent({
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'SpellView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('spells/fetchSpell', this.$route.params.id);
    },
  },
  computed: {
    distanceContent() {
      if (this.spell?.distance) {
        return `${this.spell.distance.distanceShort}. ${this.spell.distance.longText}`;
      }
      return '';
    },
    spell() {
      return this.$store.state.spells.spell || Spell.getEmpty();
    },
    source() {
      return this.spell?.source?.source || '';
    },
    classes() {
      return this.spell?.class?.map((item: ICharacterClass) => item.class).join(', ');
    },
    components() {
      return this.spell.SpellComponent?.map((component: ISpellComponent) => component.SpellComponent).join(', ');
    },
    level() {
      return this.spell.Level ? `${this.spell.Level} Уровень` : 'Заговор';
    },
    description() {
      return this.spell.description;
    },
    highLevelDescription() {
      return this.spell.HighterLevelDescription;
    },
    actionTypeDescription() {
      return this.spell.actionTypeDescription;
    },
    spellComponentDescription() {
      return this.spell?.spellComponentDescription;
    },
    scoolOfMagic() {
      return this.spell?.SchoolOfMagic?.SchoolOfMagic;
    },
    lengthSpell() {
      if (!this.spell) {
        return '';
      }
      return (this.spell.Concentration ? 'Концентрация,' : '') + this.spell.activeTime;
    },
    damageType() {
      if (!this.spell) {
        return '';
      }
      return this.spell.damageType.DamageType;
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
