<script lang="ts">
import NavigationMenu from '@/components/menu/NavigationMenu.vue';
import LoginDialog from '@/components/login/LoginDialog.vue';
import { h } from 'vue';
import { RouterView } from 'vue-router';
import { VNavigationDrawer, VLayout, VAppBar, VAppBarNavIcon, VToolbarTitle } from 'vuetify/components';
import ListPreviewLayoutMain from './ListPreviewLayoutMain.vue';

interface IVAppBarChildren {
  default: () => unknown;
  extension?: () => unknown;
}

interface IListPreviewLayoutMain {
  default: () => unknown;
  listContentView?: () => unknown;
}

export default {
  name: 'DefaultLayout',
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
  computed: {
    title() {
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
  },
  data: () => ({
    drawer: false,
  }),
  render() {
    const childrenForMain: IListPreviewLayoutMain = {
      default: () => this.$slots.default && this.$slots.default(),
    };
    if (this.hasListContentView[0]) {
      childrenForMain.listContentView = () => h(this.hasListContentView[1]);
    }

    let toolbarContent = () => this.title;

    if (!this.$vuetify.display.xs && this.mobileAdditionalMenu[0]) {
      toolbarContent = () =>
        h(
          'div',
          {
            class: {
              'd-flex': true,
            },
          },
          [this.title, h(this.mobileAdditionalMenu[1])]
        );
    }

    const childrenForAppBar: IVAppBarChildren = {
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
    if (this.$vuetify.display.xs && this.hasListContentView[0] && this.mobileAdditionalMenu[0]) {
      childrenForAppBar.extension = () => h(this.mobileAdditionalMenu[1]);
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
