<template>
  <svg @click="toggle()" :class="{ opened }" width="38" height="6" viewBox="0 0 38 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.225 5.94803C19.077 5.98223 18.923 5.98223 18.775 5.94803L1.56844 1.97435C0.408955 1.70658 0.603463 -1.84677e-06 1.79347 -1.74274e-06L36.2065 1.26575e-06C37.3965 1.36978e-06 37.591 1.70658 36.4316 1.97436L19.225 5.94803Z"
      fill="black"
      fill-opacity="0.44"
    />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: Boolean,
    },
  },
  watch: {
    value(value) {
      this.opened = value;
    },
  },
  data: () => ({
    opened: false,
  }),
  methods: {
    toggle() {
      this.$emit('toggle', !this.opened);
    },
  },
  beforeMount() {
    this.opened = this.value;
  },
});
</script>
<style scoped>
svg.opened {
  transform: rotate(180deg);
}
</style>
