<script lang="ts">
  import { PropType, ref, computed, watch } from 'vue';
  import { CitiesJson } from '@/types/countriesDto';

  export default {
    props: {
      city: {
        type: Object as PropType<CitiesJson>,
        required: true,
      },
      markerId: {
        type: Number,
        default: null,
      },
    },
    emits: ['click-zoom'],
    setup(props, { emit }) {
      const expanded = ref(false);
      const activeExpansion = ref(false);

      const getSrcArrow = computed(() => {
        return expanded.value
          ? '../../assets/icons/up-arrow.svg'
          : '../../assets/icons/down-arrow.svg';
      });

      watch(
        () => props.markerId,
        newMarkerId => {
          activeExpansion.value = !!props.city.points.find(
            i => i.id === newMarkerId
          );
        }
      );

      const onExpandedChange = () => (expanded.value = !expanded.value);

      const onExpansionItemClick = () => {
        if (expanded.value) emit('click-zoom', props.city.points[0]);
      };

      return {
        expanded,
        getSrcArrow,
        onExpandedChange,
        activeExpansion,
        onExpansionItemClick,
      };
    },
  };
</script>

<template>
  <div class="expansion-item">
    <h3
      class="header"
      :class="{ active: activeExpansion }"
      @click="onExpandedChange"
    >
      <span>{{ city.titleCity }}</span>

      <img class="header-icon" :src="getSrcArrow" alt="icon" />
    </h3>

    <div v-if="expanded || activeExpansion" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .expansion-item {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-family: 'Open Sans', sans-serif;

    .header {
      display: flex;
      justify-content: space-between;
      padding: 20px 26px;
      cursor: pointer;
      font-size: 17px;
      font-weight: bold;
      color: #537592;

      &-icon {
        width: 10px;
        color: #537592;
      }
      &.active {
        color: #ff9e00;
        border: 0;
      }
    }

    .content {
      padding: 10px;
    }
  }
</style>
