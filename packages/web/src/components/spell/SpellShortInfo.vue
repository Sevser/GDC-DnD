<template>
  <div @click.stop.prevent>
    <v-chip class="ma-0" label>
      {{ level }}
      <v-tooltip activator="parent" location="bottom">{{ levelTooltipText }}</v-tooltip>
    </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="concentration">
      K
      <v-tooltip activator="parent" location="bottom">{{ concentrationTooltipText }}</v-tooltip>
    </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="verbalComponent">
      В
      <v-tooltip activator="parent" location="bottom">{{ verbalComponentTooltipText }}</v-tooltip>
    </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="somaticComponent">
      С
      <v-tooltip activator="parent" location="bottom">{{ somaticComponentTooltipText }}</v-tooltip>
    </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="materialComponent">
      М
      <v-tooltip activator="parent" location="bottom">{{ materialComponentTooltipText }}</v-tooltip>
    </v-chip>
  </div>
</template>
<script lang="ts">
import { Spell } from '@/types/Spell';
import { ISpellComponent } from '@/types/SpellComponent';
import { defineComponent } from 'vue';

// Todo: add i18n
export default defineComponent({
  props: {
    spell: {
      type: Spell,
      required: true,
    },
  },
  data: () => ({
    tooltipProps: {},
  }),
  computed: {
    level() {
      return this.spell.Level;
    },
    levelTooltipText() {
      return this.spell.Level === 0 ? 'Это заговор' : `Это заклинание ${this.spell.Level} уровня`;
    },
    concentrationTooltipText() {
      return 'Концентрация';
    },
    concentration() {
      return this.spell.Concentration;
    },
    verbalComponent() {
      return this.spell.SpellComponent.some((value: ISpellComponent) => value.SpellComponent === 'Verbal');
    },
    somaticComponent() {
      return this.spell.SpellComponent.some((value: ISpellComponent) => value.SpellComponent === 'Somatic');
    },
    materialComponent() {
      return this.spell.SpellComponent.some((value: ISpellComponent) => value.SpellComponent === 'Material Components');
    },
    verbalComponentTooltipText() {
      return 'Вербальный компонент';
    },
    somaticComponentTooltipText() {
      return 'Соматический компонент';
    },
    materialComponentTooltipText() {
      return 'Материальный компонент';
    },
  },
});
</script>
