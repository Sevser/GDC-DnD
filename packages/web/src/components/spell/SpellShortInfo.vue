<template>
  <div>
    <v-chip class="ma-0" label>
      {{ level }}
    </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="concentration"> K </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="verbalComponent"> В </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="somaticComponent"> С </v-chip>
    <v-chip class="ma-0 ml-2" label v-if="materialComponent"> М </v-chip>
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
