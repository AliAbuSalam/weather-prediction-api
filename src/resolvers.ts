import axios from 'axios';

import { WeatherPrediction } from './types';

const createUri = (lon: string, lat: string) => `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

export const getWeather = (lon: string, lat: string): Promise<WeatherPrediction> => {
  const uri = createUri(lon, lat);
  const result = axios.get<WeatherPrediction>(uri)
  .then(({ data }) => {
    return data;
  })
  .catch(error => {
    throw error;
  });
  return result;
};

