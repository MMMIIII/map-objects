<script lang="ts">
  import { PropType, ref, computed, watch } from 'vue';
  import { CitiesJson } from '@/types/countriesDto';
  import downArrow from '../../../assets/icons/down-arrow.vue';
  import upArrow from '../../../assets/icons/up-arrow.vue';
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
    setup(props) {
      const expanded = ref(false);
      const activeExpansion = ref(false);

      const getSrcArrow = computed(() => {
        return expanded.value ? upArrow : downArrow;
      });

      watch(
        () => props.markerId,
        newMarkerId => {
          activeExpansion.value = !!props.city.points.find(
            i => i.id === newMarkerId
          );
        }
      );

      function onExpandedChange() {
        return (expanded.value = !expanded.value);
      }

      return {
        expanded,
        getSrcArrow,
        activeExpansion,
        onExpandedChange,
      };
    },
  };
</script>

<template>
  <div class="expansion-item">
    <button
      class="header"
      :class="{ active: activeExpansion }"
      @click="onExpandedChange"
    >
      <span>{{ city.titleCity }}</span>

      <component :is="getSrcArrow"></component>
    </button>

    <button v-if="expanded" class="content">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .expansion-item {
    border-bottom: 1px solid #ccc;
    font-family: 'Open Sans', sans-serif;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 26px;
      cursor: pointer;
      font-size: 17px;
      font-weight: bold;
      color: #537592;
      background: none;
      border: none;
      width: 100%;

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
      background: none;
      border: none;
      padding: 10px;
    }
    .content:last-child {
      padding-bottom: 35px;
    }
  }
  .expansion-item:first-child {
    border-top: solid 1px #ccc;
  }
</style>
