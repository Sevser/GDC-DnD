<script lang="ts">
import NavigationMenu from '@/components/menu/NavigationMenu.vue';
import LoginDialog from '@/components/login/LoginDialog.vue';
import { ComponentPublicInstance } from '@vue/runtime-dom';
import { h } from 'vue';
import { RouterView } from 'vue-router';
import { VNavigationDrawer, VLayout, VAppBar, VAppBarNavIcon, VToolbarTitle, VMain, VSheet } from 'vuetify/components';

interface IVAppBarChildren {
  default: () => unknown;
  extension?: () => unknown;
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
    VMain,
    VSheet,
  },
  computed: {
    title() {
      // todo: read name from package.json
      return this.$route.name || import.meta.env.VITE_APP_TITLE;
    },
  },
  data: () => ({
    drawer: false,
    maxHeight: 10000,
    showMobileAdditionalMenu: false,
    appBar: null,
  }),
  methods: {
    handleResize() {
      this.showMobileAdditionalMenu = document.body.clientWidth < 560;
      setTimeout(() => {
        if (this.$refs.appBar) {
          this.maxHeight = document.body.clientHeight - (this.$refs.appBar as ComponentPublicInstance).$el.clientHeight;
        }
      }, 1500);
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
        h(VToolbarTitle, [this.title]),
        h(LoginDialog),
      ],
    };
    if (this.showMobileAdditionalMenu) {
      const matched = this.$router.currentRoute.value.matched;
      if (matched && matched.some((route) => Reflect.has(route.components, 'mobileAdditionalMenu'))) {
        childrenForAppBar.extension = () =>
          h(RouterView, {
            name: 'mobileAdditionalMenu',
          });
      }
    }
    return [
      h(
        VNavigationDrawer,
        {
          modelValue: this.drawer,
          'onUpdate:modelValue': (value: boolean) => (this.drawer = value),
          app: true,
        },
        [h(NavigationMenu)]
      ),
      h(VLayout, [
        h(
          VAppBar,
          {
            absolute: true,
            ref: this.appBar,
          },
          childrenForAppBar
        ),
        h(VMain, [
          h(
            VSheet,
            {
              id: 'scrolling-techniques-4',
              class: 'overflow-y-auto',
              maxHeight: 'maxHeight',
              height: 'maxHeight',
            },
            [h(RouterView)]
          ),
        ]),
      ]),
    ];
  },
};
</script>
<style>
.hideExtension {
  display: none;
}
</style>
