import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
//uuid type
//type UUID = `${string}-${string}-${string}-${string}-${string}`
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
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
  // Method to write the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile('db/searchHistory.json', data);
    } catch (error) {
      console.error('Error writing to the file:', error);
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
   async removeCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}
export default new HistoryService();