<template>
  <v-dialog :model-value="open" @update:modelValue="handleUpdateValue" max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Filter by</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex">
              <v-select class="mr-3" label="Level" :items="allowedLevels" :model-value="filter.level" @update:modelValue="updateLevel"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateLevel()" />
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-checkbox label="Concentration" :indeterminate="filter.concentration === undefined" :model-value="filter.concentration" @update:modelValue="updateConcentration" />
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateConcentration()" />
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-select label="Class" :items="allowedClasses" :model-value="filter.class" @update:modelValue="updateClass"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateClass()" />
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-select label="Shcool of magic" :items="allowedSchoolOfMagic" :model-value="filter.school" @update:modelValue="updateSchool"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateSchool()" />
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-select label="Action Type" :items="allowedActionType" :model-value="filter.action" @update:modelValue="updateAction"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateAction()" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="reset"> Reset </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="apply"> Apply </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ISpellFilters } from '@/types/Spell/Spell';
import { ChacacterClass } from '@/types/CharacterClass';
import { SchoolOfMagicType } from '@/types/MagicSchools/SchoolOfMagic';
import { ActionType } from '@/types/Action';

interface AdditionalMenuSortData {
  dialog: boolean;
  filter: ISpellFilters;
}

export default defineComponent({
  data: (): AdditionalMenuSortData => ({
    dialog: false,
    filter: {},
  }),
  props: {
    open: {
      type: Boolean,
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.getFiltersFromStore();
      }
    },
  },
  computed: {
    allowedLevels() {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    },
    allowedClasses() {
      return ['Bard', 'Barbarian', 'Fighter', 'Wizard', 'Druid', 'Cleric', 'Warlock', 'Monk', 'Paladin', 'Rogue', 'Ranger', 'Sorcerer'];
    },
    allowedSchoolOfMagic() {
      return ['Conjuration', 'Necromancy', 'Evocation', 'Abjuration', 'Transmutation', 'Divination', 'Enchantment', 'Illusion'];
    },
    allowedActionType() {
      return ['Primary', 'Secondary', 'Reaction'];
    },
    allowedDamageType() {
      return ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
    },
  },
  methods: {
    updateAction(action?: ActionType) {
      this.filter.action = action;
    },
    apply() {
      this.$store.commit('spells/setCurrentFilters', this.filter);
      this.handleUpdateValue(false);
    },
    updateSchool(school?: SchoolOfMagicType) {
      this.filter.school = school;
    },
    reset() {
      this.filter = {};
      this.$store.commit('spells/setCurrentFilters', this.filter);
      this.handleUpdateValue(false);
    },
    updateClass(newClass?: ChacacterClass) {
      this.filter.class = newClass;
    },
    updateConcentration(val?: boolean) {
      this.filter.concentration = val;
    },
    updateLevel(level?: number) {
      this.filter.level = level;
    },
    handleUpdateValue(val: boolean) {
      if (!val) {
        this.$emit('close');
        this.$store.dispatch('spells/fetchSpellList', {});
        if (this.$router.currentRoute.value.name === 'SpellView') {
          this.$router.push({
            name: 'SpellList',
          });
        }
      }
    },
    getFiltersFromStore() {
      this.filter = JSON.parse(JSON.stringify(this.$store.state.spells.filters));
    },
  },
  mounted() {
    this.getFiltersFromStore();
  },
});
</script>
