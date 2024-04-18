export interface PointsJson {
  id: number;
  title: string;
  fullName: string;
  phoneNumber: string[];
  email: string;
}

export interface CitiesJson {
  id: number;
  titleCity: string;
  points: PointsJson[];
}

export interface CountryJson {
  id: number;
  country: string;
  coordinates: number[];
  cities: CitiesJson[];
}
