<template>
  <div>
    <v-chip class="ma-0" label>
      {{ level }}
    </v-chip>
    <v-tooltip v-if="concentration" :text="concentrationTooltipText">
      <template #activator>
        <v-chip class="ma-0 ml-2" label> K </v-chip>
      </template>
    </v-tooltip>
    <v-tooltip v-if="verbalComponent" :text="verbalComponentTooltipText">
      <template #activator>
        <v-chip class="ma-0 ml-2" label> В </v-chip>
      </template>
    </v-tooltip>
    <v-tooltip v-if="somaticComponent" :text="somaticComponentTooltipText">
      <template #activator>
        <v-chip class="ma-0 ml-2" label> С </v-chip>
      </template>
    </v-tooltip>
    <v-tooltip v-if="materialComponent" :text="materialComponentTooltipText">
      <template #activator>
        <v-chip class="ma-0 ml-2" label> М </v-chip>
      </template>
    </v-tooltip>
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
