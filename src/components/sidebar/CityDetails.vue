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

      const clickZoom = () => emit('click-zoom', props.point);

      return { clickZoom, city };
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

    <span class="details-email">{{ point.email }}</span>
  </div>
</template>

<style lang="scss">
  .details {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 26px 0;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;

    &-title {
      font-size: 17px;
      font-weight: bold;
      color: #537592;
    }

    .phone-number {
      &-title {
        padding-right: 10px;
      }
    }

    &-email {
      color: #80cff0;
    }
  }
</style>
