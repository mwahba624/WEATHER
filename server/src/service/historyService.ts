import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';


class City { // City class with name and id properties 
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService { // HistoryService class with methods to read, write, get cities, add city, and remove city
  // Method to read from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile('db/searchHistory.json', 'utf-8');
      const cities = JSON.parse(data);
      return cities;
    } catch (error) {
      console.error('Error reading the file:', error);
      return [];
    }
  }
  
  private async write(cities: City[]): Promise<void> { // write method to write the updated cities array to the searchHistory.json file
    try {
      const data = JSON.stringify(cities, null, 2); // stringify the cities array
      await fs.writeFile('db/searchHistory.json', data); // write the data to the searchHistory.json file
    } catch (error) { // catch any errors
      console.error('Error writing to the file:', error); // log the error
    }
  }
   // Method to get cities from the searchHistory.json file
   async getCities(): Promise<City[]> {
    return await this.read();
  }
  // Method to add a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.getCities();
    const newCity = new City(cityName, uuidv4());
    cities.push(newCity);
    for (let i = cities.length - 2; i >= 0; i--){
      if(cities[i].name === cityName) {
        cities.splice(i, 1);
      }
    }
    await this.write(cities);
  }
   // BONUS: Method to remove a city from the searchHistory.json file
   async removeCity(id: string): Promise<void> { // removeCity method to remove a city from the searchHistory.json file
    const cities = await this.getCities(); // get the cities from the searchHistory.json file
    const updatedCities = cities.filter(city => city.id !== id); // filter out the city with the id passed in as an argument
    await this.write(updatedCities); // write the updated cities array to the searchHistory.json file
  }
  
}
export default new HistoryService();