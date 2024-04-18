<script lang="ts">
  import { ref, watch } from 'vue';
  //@ts-ignore
  import citiesDto from '@/mock/citiesDto.json';
  import { YandexMap, YandexMarker, YandexClusterer } from 'vue-yandex-maps';
  import CityDetails from '@/components/sidebar/CityDetails.vue';

  export default {
    components: {
      YandexMap,
      YandexMarker,
      YandexClusterer,
      CityDetails,
    },
    props: {
      point: {
        type: Object,
        default: null,
      },
      countryCoordinates: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['open-expansion'],
    setup(props, { emit }) {
      const refYandexMarker = ref(null);

      const targetMarket = ref(null);
      const oldTargetMarket = ref(null);

      const settingsMap = ref({
        apiKey: 'ad50c498-f42c-4513-bf3e-0b698f4c0380',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1',
      });

      let ymaps = null;

      const markerOptions = ref({
        iconLayout: 'default#image',
        iconImageHref: '../../assets/icons/ellipse.svg',
        iconImageSize: [40, 40],
        hideIconOnBalloonOpen: false,
        balloonOffset: [8, -26],
      });

      const customClusterStyle = {
        clusterIconLayout: 'default#imageWithContent',
        clusterIconImageHref: '../../assets/icons/clusterer.svg',
        clusterIconImageSize: [40, 40],
        clusterIconContentSize: [40, 40],
        clusterIconContentOffset: [0, 11],
      };

      const clustererOptions = {
        preset: customClusterStyle,
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: false,
      };

      const clickZoom = (coordinates: number[]) =>
        ymaps.setCenter(coordinates, 10);

      watch(
        () => props.point,
        async newCoordinates => {
          ymaps.setCenter(newCoordinates.coordinates, 20);

          getTargetMarker(newCoordinates.id);

          await targetMarket.value.balloon.close();
          await targetMarket.value.balloon.open();
        },
        {
          deep: true,
        }
      );

      watch(
        () => props.countryCoordinates,
        newCountryCoordinates => {
          ymaps.setCenter(newCountryCoordinates, 4);

          if (!oldTargetMarket.value) return;
          oldTargetMarket.value.balloon.close();
        }
      );

      const getTargetMarker = (markerId: number) => {
        targetMarket.value = refYandexMarker.value.find(
          marker => marker.properties._data.markerId === markerId
        );
      };

      async function onMarkerAddShadow() {
        if (!targetMarket.value) return;

        oldTargetMarket.value = targetMarket.value;
        emit('open-expansion', oldTargetMarket.value.properties._data.markerId);

        await targetMarket.value.options.set({
          iconLayout: 'default#image',
          iconImageHref: '../../assets/icons/shadow-icon.svg',
        });
      }

      async function onMarkerDeleteShadow() {
        if (!oldTargetMarket.value) return;
        emit('open-expansion', null);

        await oldTargetMarket.value.options.set({
          iconLayout: 'default#image',
          iconImageHref: '../../assets/icons/ellipse.svg',
        });
      }

      const onMapCreated = value => (ymaps = value);

      return {
        settingsMap,
        markerOptions,
        citiesDto,
        clustererOptions,
        refYandexMarker,
        onMapCreated,
        onMarkerAddShadow,
        onMarkerDeleteShadow,
        clickZoom,
        getTargetMarker,
      };
    },
  };
</script>

<template>
  <div>
    <yandex-map
      :settings="settingsMap"
      :coordinates="[55.755864, 37.617698]"
      :zoom="10"
      class="map"
      :controls="[]"
      @created="onMapCreated"
    >
      <yandex-clusterer :options="clustererOptions">
        <yandex-marker
          v-for="city in citiesDto"
          :key="city.id"
          ref="refYandexMarker"
          :coordinates="city.coordinates"
          :marker-id="city.id"
          :options="markerOptions"
          :events="['balloonopen', 'balloonclose', 'click']"
          @balloonopen="onMarkerAddShadow"
          @balloonclose="onMarkerDeleteShadow"
          @click="getTargetMarker(city.id)"
        >
          <template #component>
            <city-details
              :point="city"
              :text-color="'#ff9e00'"
              class="balloon"
            />
          </template>
        </yandex-marker>
      </yandex-clusterer>
    </yandex-map>
  </div>
</template>

<style>
  @import '@/style/theMap.css';
</style>
