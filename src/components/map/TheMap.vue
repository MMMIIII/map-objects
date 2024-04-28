<script lang="ts">
  import { Ref, ref } from 'vue';
  import { useConfigMap } from '@/composables/useConfigMap';
  import { getBoundByCordinates } from '@/utils/bounds';
  import { YandexMap, YandexMarker, YandexClusterer } from 'vue-yandex-maps';
  //@ts-ignore
  import citiesDto from '@/mock/citiesDto.json';
  //@ts-ignore
  import countriesDto from '@/mock/countriesDto.json';
  import CityDetails from '@/components/sidebar/CityDetails.vue';

  import { CountryJson, PointsJson } from '@/types/countriesDto';
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
    },
    emits: ['open-expansion'],
    setup(props, { emit }) {
      const { settingsMap, markerOptions, clustererOptions } = useConfigMap();
      const refYandexMarker = ref(null);

      const targetMarket = ref(null);
      const oldTargetMarket = ref(null);

      const currentCountry: Ref<number | null> = ref(null);

      const jsonCountriesDto: CountryJson[] = countriesDto;

      let ymaps = null;

      async function setCenter() {
        let filtredCoordinates: number[][] = jsonCountriesDto
          .filter(county => county.id === currentCountry.value)
          .map(county => county.cities)[0]
          .map(city => {
            return city.points.map(point => point.coordinates)[0];
          });
        let bounds = getBoundByCordinates(filtredCoordinates);

        await ymaps.setBounds(bounds);
      }

      function changeCountry(countryCoordinates) {
        currentCountry.value = countryCoordinates.id;
        setCenter();

        if (!oldTargetMarket.value) return;
        oldTargetMarket.value.balloon.close();
      }

      function getTargetMarker(markerId: number) {
        targetMarket.value = refYandexMarker.value.find(
          marker => marker.properties._data.markerId === markerId
        );
      }

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

      async function openBalloon(newCoordinates: PointsJson) {
        {
          ymaps.setCenter(newCoordinates.coordinates, 20);

          getTargetMarker(newCoordinates.id);

          await targetMarket.value.balloon.close();
          await targetMarket.value.balloon.open();
        }
      }

      function onMapCreated(value) {
        ymaps = value;
      }

      return {
        settingsMap,
        markerOptions,
        citiesDto,
        clustererOptions,
        refYandexMarker,
        getTargetMarker,
        openBalloon,
        changeCountry,
        onMarkerAddShadow,
        onMarkerDeleteShadow,
        onMapCreated,
      };
    },
  };
</script>

<template>
  <main>
    <yandex-map
      :settings="settingsMap"
      :coordinates="[55.755864, 37.617698]"
      :zoom="4"
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
  </main>
</template>

<style>
  @import '@/style/theMap.css';
</style>
