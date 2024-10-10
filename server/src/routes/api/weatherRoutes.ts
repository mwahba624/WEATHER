import { Router, type Request, type Response } from 'express';
const router = Router();
// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  if(req.body) {
    //than set city property value
    WeatherService.set(cityName);
    //get coordinates - lat and lon
    const coordinates = await WeatherService.getCoodinates();
    //get actual weather data
    const data = await WeatherService.getData(coordinates[0].lat, coordinates[0].lon);
    //respond with data - NOTE: WE NEED TO TRANSFORM SHAPE THE DATA INTO WHAT THE FROM-END IS EXPECTING - this res.json(data) might need to be done below - using historyService to store current city weather info - refer to week9 mini project for example.
    //res.json(data)
    res.json(data);
  }else {
      res.send('request error!');
  }
  // TODO: save city to search history
  //than repond to frontend with data
  //res.json(frontendExpectedObjArray)
});
// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  
});
// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req: Request, res: Response) => {});
export default router;