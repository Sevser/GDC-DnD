<script lang="ts">
import { defineComponent } from 'vue';
import { h } from 'vue';
import { VMain } from 'vuetify/components';

export default defineComponent({
  components: {
    VMain,
  },
  render() {
    if (this.$slots.listContentView) {
      if (this.$vuetify.display.xs) {
        return [
          h(
            VMain,
            {
              scrollable: true,
            },
            {
              default: () => this.$slots.listContentView(),
            }
          ),
        ];
      } else {
        return [
          h(
            VMain,
            {
              scrollable: true,
              style: {
                display: 'none',
              },
            },
            {
              default: () => this.$slots.default(),
            }
          ),
          h(
            VMain,
            {
              scrollable: true,
            },
            {
              default: () => this.$slots.listContentView(),
            }
          ),
        ];
      }
    } else {
      return h(
        VMain,
        {
          scrollable: true,
        },
        {
          default: () => this.$slots.default(),
        }
      );
    }
  },
});
</script>
