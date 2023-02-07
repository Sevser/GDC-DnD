<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex flex-column align-center">
      <div class="text-subtitle-2">СИЛ</div>
      <div>
        {{ bc.toText(bc.Strength) }}
      </div>
    </div>
    <div class="d-flex flex-column align-center">
      <div class="text-subtitle-2">ЛОВ</div>
      <div>
        {{ bc.toText(bc.Dexterity) }}
      </div>
    </div>
    <div class="d-flex flex-column align-center">
      <div class="text-subtitle-2">ТЕЛ</div>
      <div>
        {{ bc.toText(bc.Constitution) }}
      </div>
    </div>
    <div class="d-flex flex-column align-center">
      <div class="text-subtitle-2">ИНТ</div>
      <div>
        {{ bc.toText(bc.Intelligence) }}
      </div>
    </div>
    <div class="d-flex flex-column align-center">
      <div class="text-subtitle-2">МДР</div>
      <div>
        {{ bc.toText(bc.Wisdom) }}
      </div>
    </div>
    <div class="d-flex flex-column align-center">
      <div class="text-subtitle-2">ХАР</div>
      <div>
        {{ bc.toText(bc.Charisma) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { BaseCharacteristics } from '@/types/BaseCharacteristics/BaseCharacteristics';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    bc: {
      type: BaseCharacteristics,
      default: BaseCharacteristics.getEmpty(),
    },
  },
  methods: {},
});
</script>
