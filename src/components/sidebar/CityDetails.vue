<script lang="ts">
  import { ref } from 'vue';
  export default {
    props: {
      point: {
        type: Object,
        default: null,
      },
      textColor: {
        type: String,
        default: '#537592',
      },
    },
    emits: ['click-zoom'],
    setup(props, { emit }) {
      const city = ref(null);

      function clickZoom() {
        emit('click-zoom', props.point);
      }

      return { city, clickZoom };
    },
  };
</script>

<template>
  <div ref="city" class="details" @click.stop="clickZoom">
    <h3 class="details-title" :style="{ color: textColor }">
      {{ point.title }}
    </h3>

    <span class="details-full-name">{{ point.fullName }}</span>

    <div class="phone-number">
      <span
        v-for="(phoneNumber, indexPhoneNumber) in point.phoneNumber"
        :key="indexPhoneNumber"
        class="phone-number-title"
      >
        {{ phoneNumber }}
      </span>
    </div>

    <a href="#" target="_blank" class="details-email">{{ point.email }}</a>
  </div>
</template>

<style lang="scss">
  .details {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: 0 0 0 20px;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;

    &-title {
      font-size: 17px;
      font-weight: bold;
      color: #537592;
    }

    .phone-number {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      &-title {
        padding-right: 10px;
      }
    }

    &-email {
      color: #80cff0;
      text-decoration: none;
    }
  }
</style>
