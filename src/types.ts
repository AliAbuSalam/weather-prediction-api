export type WeatherPrediction = {
  product: 'astro'|'civil'|'civillight'|'meteo'|'two',
  init: string,
  dataseries: Array<dayPrediction>
};

type dayPrediction = {
  timepoint: number,
  cloudcover: number,
  lifted_index: number,
  prec_type: 'snow'|'rain'|'frzr'|'icep'|'none',
  prec_amount: number,
  temp2m: number,
  rh2m: string,
  wind10m: {
    direction: 'N'|'NE'|'E'|'SE'|'S'|'SW'|'W'|'NW',
    speed: number
  },
  weather: 'clearday'|'clearnight'|'pcloudyday'|'pcloudynight'|'mcloudyday'|'mcloudynight'|'cloudyday'|'cloudynight'
    |'humidday'|'humidnight'|'lightrainday'|'lightrainnight'|'oshowerday'|'oshowernight'|'ishowerday'|'ishowernight'
    |'lightsnowday'|'lightsnownight'|'rainday'|'rainnight'|'snowday'|'snownight'|'rainsnowday'|'rainsnownight'
};

export type LocationResult = {
  place_id: string,
  license: string,
  osm_type: 'node'|'way'|'relation',
  osm_id: string,
  bounding_box: string[],
  lat: string,
  lon: string,
  display_name: string,
  class: string,
  type: string,
  importance: number,
  icon?: string
};