<script lang="ts">
import { defineComponent } from 'vue';
import { h } from 'vue';
import { VMain, VTabs, VTab } from 'vuetify/components';

export default defineComponent({
  components: {
    VMain,
    VTab,
    VTabs,
  },
  methods: {
    getTabs() {
      const mathcedDefaultRoute = this.$route.matched.find((route) => route.components && Object.hasOwn(route.components, 'default'));
      return mathcedDefaultRoute?.children
        .map((childRoute) => ({
          tabName: childRoute?.meta?.tabName,
          pathName: childRoute.name,
          active: !!this.$route.matched.find((matched) => matched.name === childRoute.name),
        }))
        .map((routeDescription) =>
          h(
            VTab,
            {
              to: {
                name: routeDescription.pathName,
              },
            },
            {
              default: () => routeDescription.tabName,
            }
          )
        );
    },
  },
  render() {
    if (this.$slots.tabContent) {
      if (this.$vuetify.display.xs) {
        return [
          h(
            VMain,
            {
              scrollable: true,
            },
            {
              default: () => [
                h(
                  VTabs,
                  {
                    bgColor: 'primary',
                    centerActive: true,
                    nextIcon: 'mdi-arrow-right-bold-box-outline',
                    prevIcon: 'mdi-arrow-left-bold-box-outline',
                    showArrows: true,
                  },
                  {
                    default: () => this.getTabs(),
                  }
                ),
                this.$slots.tabContent && this.$slots.tabContent(),
              ],
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
                width: '400px',
              },
            },
            {
              default: () => this.$slots.default && this.$slots.default(),
            }
          ),
          h(
            VMain,
            {
              scrollable: true,
              style: {
                width: 'calc(100vw - 400px)',
                left: 'unset',
                right: '0',
              },
            },
            {
              default: () => [
                h(
                  VTabs,
                  {
                    bgColor: 'primary',
                    centerActive: true,
                    nextIcon: 'mdi-arrow-right-bold-box-outline',
                    prevIcon: 'mdi-arrow-left-bold-box-outline',
                    showArrows: true,
                  },
                  {
                    default: this.getTabs(),
                  }
                ),
                this.$slots.tabContent && this.$slots.tabContent(),
              ],
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
          default: () => this.$slots.default && this.$slots.default(),
        }
      );
    }
  },
});
</script>
