<template>
  <div @click.stop.prevent>
    <v-chip class="ma-0" label>
      {{ level }}
    </v-chip>
    <v-chip v-if="concentration" class="ma-0 ml-2" label v-tooltip="{ content: concentrationTooltipText, triggers: ['hover', 'click', 'focus', 'touch'] }"> K </v-chip>
    <v-chip v-if="verbalComponent" class="ma-0 ml-2" label v-tooltip="{ content: verbalComponentTooltipText, triggers: ['hover', 'click', 'focus', 'touch'] }"> В </v-chip>
    <v-chip v-if="somaticComponent" class="ma-0 ml-2" label v-tooltip="{ content: somaticComponentTooltipText, triggers: ['hover', 'click', 'focus', 'touch'] }"> С </v-chip>
    <v-chip v-if="materialComponent" class="ma-0 ml-2" label v-tooltip="{ content: materialComponentTooltipText, triggers: ['hover', 'click', 'focus', 'touch'] }"> М </v-chip>
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
      default: () => Spell.getEmpty(),
    },
  },
  data: () => ({
    tooltipProps: {},
    somaticComponent: false,
    verbalComponent: false,
    materialComponent: false,
    concentration: false,
    level: '',
    levelTooltipText: '',
    concentrationTooltipText: 'Концентрация',
    verbalComponentTooltipText: 'Вербальный компонент',
    somaticComponentTooltipText: 'Соматический компонент',
    materialComponentTooltipText: 'Материальный компонент',
  }),
  methods: {
    calcComponents() {
      this.spell.SpellComponent.forEach((value: ISpellComponent) => {
        if (value.SpellComponent === 'Verbal') {
          this.verbalComponent = true;
        }
        if (value.SpellComponent === 'Somatic') {
          this.somaticComponent = true;
        }
        if (value.SpellComponent === 'Material Components') {
          this.materialComponent = true;
        }
      });
      this.concentration = this.spell.Concentration;
      this.level = this.spell.Level.toString();
      this.levelTooltipText = this.spell.Level === 0 ? 'Это заговор' : `Это заклинание ${this.spell.Level} уровня`;
    },
  },
  created() {
    this.calcComponents();
  },
});
</script>
