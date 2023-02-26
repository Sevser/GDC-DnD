<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'WeaponList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      <div class="text-h4">
        {{ weapon.name }}
      </div>
    </template>
    <template #subtitle>
      {{ weapon.categoryRange }}
    </template>
    <template #text>
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Damage:</div>
          <div>
            {{ weapon.damage.damageDice }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Cost:</div>
          <div>
            {{ cost }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Weight:</div>
          <div>
            {{ weapon.weight }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Properties:</div>
          <div>
            {{ weaponProperties }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Weapon range:</div>
          <div>
            {{ weapon.weaponRange }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Range normal:</div>
          <div>{{ weapon.range.normal }} ft.</div>
        </div>
        <div v-if="weapon.range.long" class="d-flex">
          <div class="text-subtitle-2 mr-2">Range long:</div>
          <div>{{ weapon.range.long }} ft.</div>
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'WeaponView') {
          this.$store.commit(
            'equipment/updateWeapon',
            this.$store.state.equipment.weaponList.find((a) => a.id.toString() === this.$route.params.id.toString())
          );
        }
      },
    },
  },
  computed: {
    weapon() {
      return this.$store.state.equipment.weapon;
    },
    cost() {
      return `${this.weapon.cost.quantity} ${this.weapon.cost.unit}`;
    },
    weaponProperties() {
      return this.weapon.weaponProperties.map((p) => p.name).join(', ');
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
