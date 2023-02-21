<script lang="ts">
import { defineComponent, h } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import { VProgressCircular } from 'vuetify/components';
import { ICanBeDictionary } from '@/types/Dictionaries/CanBeDictionary';

export default defineComponent({
  components: {
    DefaultLayout,
    VProgressCircular,
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (newValue, oldValue) => {
        if (!oldValue || newValue.id !== oldValue.id) {
          this.$store.dispatch('dictionary/fetchDicrionary', this.$route.params.id);
        }
      },
      { immediate: true }
    );
  },
  computed: {
    items() {
      return this.$store.state.dictionary.dictionaryContent;
    },
    pending() {
      return this.$store.state.dictionary.dictionaryContentPending && (this.items === undefined || this.items.length === 0);
    },
  },
  beforeUnmount() {
    this.$store.commit('dictionary/updateCurrentDicrionary');
  },
  render() {
    return h(DefaultLayout, {}, [
      h(
        'div',
        {
          class: {
            'pl-2': true,
            'pr-2': true,
          },
          style: {
            height: '100%',
          },
        },
        this.pending
          ? h(
              'div',
              {
                class: {
                  'd-flex': true,
                  'justify-center': true,
                  'align-center': true,
                },
                style: {
                  height: '100%',
                },
              },
              [
                h(VProgressCircular, {
                  indeterminate: true,
                  size: 60,
                }),
              ]
            )
          : this.items &&
              this.items.map((item: ICanBeDictionary) =>
                h(item.getDictionaryView(), {
                  item,
                })
              )
      ),
    ]);
  },
});
</script>
