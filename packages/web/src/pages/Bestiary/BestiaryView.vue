<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'BestiaryList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      <div class="text-h4">
        {{ beast.name }}
      </div>
    </template>
    <template #subtitle>
      <div class="text-subtitle-1 d-flex">
        <div class="mr-3">{{ beast.type }}</div>
        <div class="mr-3">{{ beast.Size && beast.Size.Size }}</div>
        <router-link class="mr-3" :to="{ name: 'DictionaryView', params: { id: 'alignments' } }">{{ beast.alignment && beast.alignment.alignment }}</router-link>
      </div>
    </template>
    <template #text>
      <div class="d-flex flex-column">
        <BeastViewCharacteristicsImage :beast="beast" />
        <beast-view-base-characteristics :bc="beast.base_characteristic" />
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Damage Immunities:</div>
          <div>
            {{ damageImmunities }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Damage Resistances:</div>
          <div>
            {{ damageResistances }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Damage Vulnerabilities:</div>
          <div>
            {{ damageVulnerabilities }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Senses:</div>
          <div>
            {{ senses }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Languagues:</div>
          <div>
            {{ beast.languages }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Dangereous:</div>
          <div>
            {{ dangereous }}
          </div>
        </div>
        <div class="d-flex flex-column" v-if="specialAbilities.length">
          <div class="text-h6">Special Abilities</div>
          <BeastViewAction v-for="action in specialAbilities" :key="action.name" :action="action" />
        </div>
        <div class="d-flex flex-column" v-if="actions.length">
          <div class="text-h6">Actions</div>
          <BeastViewAction v-for="action in actions" :key="action.name" :action="action" />
        </div>
        <div class="d-flex flex-column" v-if="legendaryAction.length">
          <div class="text-h6">Legendary Actions</div>
          <BeastViewAction v-for="action in legendaryAction" :key="action.name" :action="action" />
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { IBeastModel } from '@/types/beasts/Beast';
import { defineComponent } from 'vue';
import BeastViewBaseCharacteristics from '@/components/bestiary/BeastView/BeastViewBaseCharacteristics.vue';
import BeastViewCharacteristicsImage from '@/components/bestiary/BeastView/BeastViewCharacteristicsImage.vue';
import BeastViewAction from '@/components/bestiary/BeastView/BeastViewAction.vue';
import { Actions } from '@/types/Actions/Actions';

export default defineComponent({
  components: {
    BeastViewBaseCharacteristics,
    BeastViewCharacteristicsImage,
    BeastViewAction,
  },
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'BestiaryView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('bestiary/fetchBeast', this.$route.params.id);
    },
  },
  computed: {
    beast() {
      return this.$store.state.bestiary.beast || ({} as IBeastModel);
    },
    senses() {
      const senseDescr = new Array<string>();
      if (this.beast.senses?.blindsight) {
        senseDescr.push('blindsight ' + this.beast.senses.blindsight);
      }
      if (this.beast.senses?.darkvision) {
        senseDescr.push('darkvision ' + this.beast.senses.darkvision);
      }
      if (this.beast.senses?.passive_perception) {
        senseDescr.push('passive perception ' + this.beast.senses.passive_perception);
      }
      if (this.beast.senses?.truesight) {
        senseDescr.push('truesight ' + this.beast.senses.truesight);
      }
      return senseDescr.join(', ');
    },
    specialAbilities() {
      if (this.beast.specialAbilities) {
        return this.beast.specialAbilities;
      }
      return new Array<Actions>();
    },
    actions() {
      if (this.beast.actions) {
        return this.beast.actions;
      }
      return new Array<Actions>();
    },
    legendaryAction() {
      if (this.beast.legendaryAction) {
        return this.beast.legendaryAction;
      }
      return new Array<Actions>();
    },
    damageImmunities() {
      if (this.beast.damageImmunities) {
        return this.beast.damageImmunities
          .map((damage) => {
            if (damage.DamageType === 'None') {
              return damage.CustomDamage;
            }
            return damage.DamageType;
          })
          .join(', ');
      }
      return new Array<string>();
    },
    damageResistances() {
      if (this.beast.damageResistances) {
        return this.beast.damageResistances
          .map((damage) => {
            if (damage.DamageType === 'None') {
              return damage.CustomDamage;
            }
            return damage.DamageType;
          })
          .join(', ');
      }
      return new Array<string>();
    },
    damageVulnerabilities() {
      if (this.beast.damageVulnerabilities) {
        return this.beast.damageVulnerabilities
          .map((damage) => {
            if (damage.DamageType === 'None') {
              return damage.CustomDamage;
            }
            return damage.DamageType;
          })
          .join(', ');
      }
      return new Array<string>();
    },
    dangereous() {
      return `${this.beast.challenge_rating} (${this.beast.xp} xp)`;
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
