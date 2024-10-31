import { Router, type Request, type Response } from 'express';
const router = Router();
// import HistoryService from '../../service/historyService.js';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => { // post request to the root route with city name to retrieve weather data
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  if(req.body) {
    //than set city property value
    weatherService.set(cityName); // set the city property value to the city name passed in the request body
    //get coordinates - lat and lon
    const coordinates = await weatherService.getCoodinates(); // get the coordinates from the city name
    //get actual weather data
    const data = await weatherService.getData(coordinates[0].lat, coordinates[0].lon); // get the weather data from the coordinates

    historyService.addCity(cityName); // add the city name to the search history

    //respond with data - NOTE: WE NEED TO TRANSFORM SHAPE THE DATA INTO WHAT THE FROM-END IS EXPECTING - this res.json(data) might need to be done below - using historyService to store current city weather info - refer to week9 mini project for example.
    //res.json(data)
    res.json(data); // respond with the weather data in JSON format
  }else {
      res.send('request error!');
  }
  
});
// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {  // get request to the /history route to get the search history
  const cities = await historyService.getCities(); // get the cities from the search history
  res.json(cities); // respond with the cities in JSON format
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => { // delete request to the /history/:id route to delete a city from the search history
  try { // try block
    if (!req.params.id) { // if there is no id in the request parameters
      res.status(400).json({ msg: 'State id is required' });
    }
    await historyService.removeCity(req.params.id); // remove the city from the search history
    res.json({ success: 'State successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router; // export the router