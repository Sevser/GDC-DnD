<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left" rowspan="2">Уровень</th>
        <th class="text-left" rowspan="2">БМ</th>
        <th class="text-left" rowspan="2">Умения</th>
        <th class="text-left" rowspan="2">Известные заговоры</th>
        <th class="text-left" colspan="8">Ячейки заклинаний на уровень заклинаний</th>
      </tr>
      <tr>
        <th class="text-left">1</th>
        <th class="text-left">2</th>
        <th class="text-left">3</th>
        <th class="text-left">4</th>
        <th class="text-left">5</th>
        <th class="text-left">6</th>
        <th class="text-left">7</th>
        <th class="text-left">8</th>
        <th class="text-left">9</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="level in prepLevels" :key="level.name">
        <td>
          {{ level.level }}
        </td>
        <td>
          {{ level.profBonus }}
        </td>
        <td>
          {{ level.features.map((sp) => sp.name).join(', ') }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.cantripsKnown) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel1) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel2) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel3) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel4) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel5) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel6) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel7) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel8) || '-' }}
        </td>
        <td>
          {{ (level.spellcasting && level.spellcasting.spellSlotsLevel9) || '-' }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script lang="ts">
import { LevelModel } from '@/types/Level/Level';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    levels: {
      type: Array as PropType<LevelModel[]>,
      default: () => new Array<LevelModel>(),
    },
  },
  computed: {
    prepLevels() {
      return this.levels.slice().sort((a, b) => a.level - b.level);
    },
  },
});
</script>
