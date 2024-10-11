import { Router, type Request, type Response } from 'express';
const router = Router();
// import HistoryService from '../../service/historyService.js';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  if(req.body) {
    //than set city property value
    weatherService.set(cityName);
    //get coordinates - lat and lon
    const coordinates = await weatherService.getCoodinates();
    //get actual weather data
    const data = await weatherService.getData(coordinates[0].lat, coordinates[0].lon);

    historyService.addCity(cityName);

    //respond with data - NOTE: WE NEED TO TRANSFORM SHAPE THE DATA INTO WHAT THE FROM-END IS EXPECTING - this res.json(data) might need to be done below - using historyService to store current city weather info - refer to week9 mini project for example.
    //res.json(data)
    res.json(data);
  }else {
      res.send('request error!');
  }
  
});
// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => { 
  const cities = await historyService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'State id is required' });
    }
    await historyService.removeCity(req.params.id);
    res.json({ success: 'State successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router;