<script lang="ts">
  import { ref } from 'vue';
  //@ts-ignore
  import countriesDto from '@/mock/countriesDto.json';
  import ExpansionItem from '@/components/sidebar/ExpansionItem.vue';
  import CityDetails from '@/components/sidebar/CityDetails.vue';
  import { CountryJson } from '@/types/countriesDto';

  export default {
    components: {
      ExpansionItem,
      CityDetails,
    },
    props: {
      markerId: {
        type: Number,
        default: null,
      },
    },
    emits: ['change-country', 'click-zoom'],
    setup(props, { emit }) {
      const activeTab = ref(1);
      const countriesJson = ref<CountryJson[]>(countriesDto);

      const onCountryChange = (country: CountryJson) => {
        activeTab.value = country.id;

        emit('change-country', country);
      };

      return {
        countriesJson,
        activeTab,
        onCountryChange,
      };
    },
  };
</script>

<template>
  <div class="sidebar">
    <div>
      <button
        v-for="country in countriesJson"
        :key="country.id"
        :class="{ active: activeTab === country.id, tabs: true }"
        @click="onCountryChange(country)"
      >
        {{ country.country }}
      </button>
    </div>

    <div
      v-for="country in countriesJson"
      v-show="activeTab === country.id"
      :key="country.id"
      class="tab"
    >
      <expansion-item
        v-for="(city, index) in country.cities"
        :key="index"
        :city="city"
        :marker-id="markerId"
      >
        <city-details
          v-for="point in city.points"
          :key="point.id"
          :point="point"
          @click-zoom="$emit('click-zoom', $event)"
        />
      </expansion-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .sidebar {
    & button {
      cursor: pointer;
      border: none;
      background: none;
      padding: 8px 16px;
      transition: background-color 0.3s;
      border: solid #a7a7a7 1px;
      color: #d7d7d7;
      color: #a7a7a7;
      width: 50%;
      height: 38px;
    }

    .tab {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .tabs {
      margin-bottom: 15px;
    }

    & button.active {
      background-color: #ff9e00;
      color: #fafafa;
      border: 0;
    }
  }
</style>
