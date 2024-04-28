import { ref } from 'vue';

export function useConfigMap() {
  const settingsMap = ref({
    apiKey: 'ad50c498-f42c-4513-bf3e-0b698f4c0380',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1',
  });

  const markerOptions = ref({
    iconLayout: 'default#image',
    iconImageHref: '../../assets/icons/ellipse.svg',
    iconImageSize: [40, 40],
    hideIconOnBalloonOpen: false,
    iconImageOffset: [-20, -20],
    balloonOffset: [-1, -8],
  });

  const customClusterStyle = {
    clusterIconLayout: 'default#imageWithContent',
    clusterIconImageHref: '../../assets/icons/clusterer.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [-3, -42],
  };

  const clustererOptions = {
    preset: customClusterStyle,
    groupByCoordinates: false,
    openBalloonOnClick: false,
  };

  return {
    settingsMap,
    markerOptions,
    clustererOptions,
  };
}
