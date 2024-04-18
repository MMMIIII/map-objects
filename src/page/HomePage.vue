<script lang="ts">
  import { ref } from 'vue';
  import TabsCountries from '@/components/sidebar/TabsCountries.vue';
  import TheMap from '@/components/map/TheMap.vue';

  export default {
    components: {
      TabsCountries,
      TheMap,
    },
    emits: ['click-zoom'],
    setup() {
      const point = ref(null);
      const markerId = ref(null);
      const countryCoordinates = ref([]);
      const test = ref(true);
      const openBtn = ref(false);

      const onTabsClick = currentPoint => {
        if (window.screen.width <= 500) test.value = false;
        point.value = currentPoint;
      };

      return {
        point,
        countryCoordinates,
        test,
        markerId,
        openBtn,
        onTabsClick,
      };
    },
  };
</script>

<template>
  <div class="container">
    <button v-show="!test" class="nav-toggle opened" @click="test = !test">
      <span class="bar-top"></span>
      <span class="bar-mid"></span>
      <span class="bar-bot"></span>
    </button>

    <tabs-countries
      v-show="test"
      class="tabs"
      :marker-id="markerId"
      @click-zoom="onTabsClick"
      @change-country="countryCoordinates = $event"
    />

    <the-map
      class="map"
      :country-coordinates="countryCoordinates"
      :point="point"
      @open-expansion="markerId = $event"
    />
  </div>
</template>

<style>
  @import '@/style/homePage.css';
</style>
