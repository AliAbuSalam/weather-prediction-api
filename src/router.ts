import express, { Request, Response} from 'express';

import { getWeather, locationToCoordinatesResolver } from './resolvers';
import { WeatherPrediction } from './types';

const router = express.Router();

router.get('/weather', (req: Request, res: Response) => {
  const lon = req.query.lon?.toString() || '';  
  const lat = req.query.lat?.toString() || '';
  
  getWeather(lon, lat).then((data: WeatherPrediction)  => {
    if(data){
      res.send(data);
    }
  }).catch(error => {
    if(error instanceof Error){
      res.send(error.message).status(400);
    }
  });  
});

router.get('/location', locationToCoordinatesResolver);

export default router;