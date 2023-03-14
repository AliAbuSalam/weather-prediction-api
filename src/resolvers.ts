import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { Request, Response } from 'express';

import { WeatherPrediction, LocationResult } from './types';

const createUri7Timer = (lon: string, lat: string) => `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

export const getWeather = (lon: string, lat: string): Promise<WeatherPrediction> => {
  const uri = createUri7Timer(lon, lat);
  const result = axios.get<WeatherPrediction>(uri)
  .then(({ data }) => {
    return data;
  })
  .catch(error => {
    throw error;
  });
  return result;
};

const createUriLocationIq = (query: string) => `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_ACCESS_TOKEN}&q=${query}&format=json`;  

const getCoordinates = async (query: string): Promise<LocationResult[]> => {
  const uri = createUriLocationIq(query);
  const { data } = await axios.get<LocationResult[]>(uri);
  return data;
};

export const locationToCoordinatesResolver = (req: Request, res: Response) => {
  const query = req.query.address?.toString() || '';
  if(!query){
    res.send('address cannot be empty').status(400);
  }
  getCoordinates(query)
    .then(result => res.json(result))
    .catch(error => {
      if(error instanceof Error){
        console.log('error: ', error.message);
        
        res.send(error.message).status(500);
      }
      res.send('unidentified error occured!').status(500);
    });
};