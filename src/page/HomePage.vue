<script lang="ts">
  import { ref } from 'vue';
  import { PointsJson, CountryJson } from '@/types/countriesDto';
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
      const navToggle = ref(true);
      const openBtn = ref(false);
      const map = ref(null);

      function onTabsClick(currentPoint: PointsJson) {
        if (window.innerWidth <= 740) navToggle.value = false;

        map.value.openBalloon(currentPoint);
        point.value = currentPoint;
      }

      function onCountryCoordinatesChange(countryCoordinates: CountryJson) {
        map.value.changeCountry(countryCoordinates);
      }

      return {
        point,
        navToggle,
        markerId,
        openBtn,
        map,
        onCountryCoordinatesChange,
        onTabsClick,
      };
    },
  };
</script>

<template>
  <div class="container">
    <aside class="aside">
      <button
        class="nav-toggle"
        :class="{ opened: navToggle }"
        @click="navToggle = !navToggle"
      >
        <span class="bar-top"></span>
        <span class="bar-mid"></span>
        <span class="bar-bot"></span>
      </button>

      <tabs-countries
        v-show="navToggle"
        class="tabs"
        :marker-id="markerId"
        @click-zoom="onTabsClick"
        @change-country="onCountryCoordinatesChange"
      />
    </aside>

    <the-map
      ref="map"
      class="map"
      :point="point"
      @open-expansion="markerId = $event"
    />
  </div>
</template>

<style>
  @import '@/style/homePage.css';
</style>
