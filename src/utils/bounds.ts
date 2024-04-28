export function getBoundByCordinates(coordinates: number[][]) {
  let minLatitude = Number.POSITIVE_INFINITY;
  let maxLatitude = Number.NEGATIVE_INFINITY;
  let minLongitude = Number.POSITIVE_INFINITY;
  let maxLongitude = Number.NEGATIVE_INFINITY;

  coordinates.forEach(function (obj) {
    var latitude = obj[0];
    var longitude = obj[1];

    minLatitude = Math.min(minLatitude, latitude);
    maxLatitude = Math.max(maxLatitude, latitude);
    minLongitude = Math.min(minLongitude, longitude);
    maxLongitude = Math.max(maxLongitude, longitude);
  });
  return [
    [minLatitude, minLongitude],
    [maxLatitude, maxLongitude],
  ];
}
