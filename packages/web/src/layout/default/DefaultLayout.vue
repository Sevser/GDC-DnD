<script lang="ts">
import NavigationMenu from '@/components/menu/NavigationMenu.vue';
import LoginDialog from '@/components/login/LoginDialog.vue';
import { h } from 'vue';
import { RouterView } from 'vue-router';
import { VNavigationDrawer, VLayout, VAppBar, VAppBarNavIcon, VToolbarTitle } from 'vuetify/components';
import DefaultLayoutMain from './DefaultLayoutMain.vue';

interface IVAppBarChildren {
  default: () => unknown;
  extension?: () => unknown;
}

interface IDefaultLayoutMain {
  default: () => unknown;
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
    DefaultLayoutMain,
  },
  computed: {
    title() {
      // todo: read name from package.json
      return this.$route.name || import.meta.env.VITE_APP_TITLE;
    },
  },
  data: () => ({
    drawer: false,
    showMobileAdditionalMenu: false,
  }),
  methods: {
    handleResize() {
      this.showMobileAdditionalMenu = document.body.clientWidth < 560;
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  },
  mounted() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  },
  render() {
    const childrenForAppBar: IVAppBarChildren = {
      default: () => [
        h(VAppBarNavIcon, {
          onClick: () => (this.drawer = !this.drawer),
        }),
        h(
          VToolbarTitle,
          {},
          {
            default: () => this.title,
          }
        ),
        h(LoginDialog),
      ],
    };
    if (this.showMobileAdditionalMenu) {
      const matched = this.$router.currentRoute.value.matched;
      const route = matched && matched.find((route) => Reflect.has(route.components, 'mobileAdditionalMenu'));
      if (route) {
        childrenForAppBar.extension = () => h(route.components.mobileAdditionalMenu);
      }
    }

    const childrenForMain: IDefaultLayoutMain = {
      default: () => this.$slots.default && this.$slots.default(),
    };
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
            h(DefaultLayoutMain, {}, childrenForMain),
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
