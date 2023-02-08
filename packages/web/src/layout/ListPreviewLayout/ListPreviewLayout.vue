<script lang="ts">
import NavigationMenu from '@/components/menu/NavigationMenu.vue';
import LoginDialog from '@/components/login/LoginDialog.vue';
import { h, VueElement } from 'vue';
import { RouterView } from 'vue-router';
import { VNavigationDrawer, VLayout, VAppBar, VAppBarNavIcon, VToolbarTitle } from 'vuetify/components';
import ListPreviewLayoutMain from './ListPreviewLayoutMain.vue';
import { RawSlots } from '../../types/Vue';

export default {
  name: 'ListPreviewLayour',
  components: {
    NavigationMenu,
    LoginDialog,
    RouterView,
    VNavigationDrawer,
    VLayout,
    VAppBar,
    VAppBarNavIcon,
    VToolbarTitle,
    ListPreviewLayoutMain,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    calcTitle() {
      if (this.title && this.title.length) {
        return this.title;
      }
      // todo: read name from package.json
      return this.$route.name || import.meta.env.VITE_APP_TITLE;
    },
    hasListContentView() {
      const matched = this.$router.currentRoute.value.matched;
      const route = matched && matched.find((route) => Reflect.has(route.components, 'listContentView'));
      if (route) {
        return [true, route.components.listContentView];
      }
      return [false];
    },
    mobileAdditionalMenu() {
      const matched = this.$router.currentRoute.value.matched;
      const route = matched && matched.find((route) => Reflect.has(route.components, 'mobileAdditionalMenu'));
      if (route) {
        return [true, route.components.mobileAdditionalMenu];
      }
      return [false];
    },
    currentRouteHasAdditionalMenu() {
      const matched = this.$router.currentRoute.value.matched;
      const route = matched && matched.find((route) => Reflect.has(route.components, 'mobileAdditionalMenu'));
      return route && route.name === this.$router.currentRoute.value.name;
    },
  },
  data: () => ({
    drawer: false,
  }),
  render() {
    const childrenForMain: RawSlots = {
      default: () => this.$slots.default && this.$slots.default(),
    };
    if (this.hasListContentView[0]) {
      childrenForMain.listContentView = () => h(this.hasListContentView[1] as VueElement);
    }

    let toolbarContent = () => this.calcTitle;

    if (!this.$vuetify.display.xs && this.mobileAdditionalMenu[0]) {
      toolbarContent = () =>
        h(
          'div',
          {
            class: {
              'd-flex': true,
            },
          },
          [h(this.mobileAdditionalMenu[1] as VueElement)]
        );
    }

    const childrenForAppBar: RawSlots = {
      default: () => [
        h(VAppBarNavIcon, {
          onClick: () => (this.drawer = !this.drawer),
        }),
        h(
          VToolbarTitle,
          {},
          {
            default: toolbarContent,
          }
        ),
        h(LoginDialog),
      ],
    };
    if (this.$vuetify.display.xs && this.mobileAdditionalMenu[0] && this.currentRouteHasAdditionalMenu) {
      childrenForAppBar.extension = () => h(this.mobileAdditionalMenu[1] as VueElement);
    }

    return [
      h(
        VNavigationDrawer,
        {
          modelValue: this.drawer,
          'onUpdate:modelValue': (value: boolean) => (this.drawer = value),
          app: true,
        },
        {
          default: () => h(NavigationMenu),
        }
      ),
      h(
        VLayout,
        {},
        {
          default: () => [
            h(
              VAppBar,
              {
                absolute: true,
              },
              childrenForAppBar
            ),
            h(ListPreviewLayoutMain, {}, childrenForMain),
          ],
        }
      ),
    ];
  },
};
</script>
<style>
.hideExtension {
  display: none;
}
</style>
