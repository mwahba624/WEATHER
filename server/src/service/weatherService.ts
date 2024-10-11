import dotenv from 'dotenv';
dotenv.config();
/*
// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
*/
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDesc: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  constructor(
  city: string,
  date: string,
  icon: string,
  iconDesc: string,
  tempF: number,
  windSpeed: number,
  humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDesc = iconDesc;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
//let weatherArray: Weather[] = [];
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  //private baseURL = `${process.env.API_BASE_URL}`;
  //private apiKey = `${process.env.API_KEY}`;
  protected cityName: string = '';

  //set method for cityName
  set(cityName: string) {
    this.cityName = cityName;
  }

  get() {
    return this.cityName;
  }

  logCity() {
    console.log(this.cityName);
  }
  async getCoodinates() {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${process.env.API_KEY}`;
    try {
      const response = await fetch(url);
      const coordinates = await response.json();
      return coordinates;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
  }
  async getData(lat: number, lon: number) {
    //note: this might need to be define in global scope
    let weatherArray: Weather[] = [];
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const originalDataArray = data.list;
      //break into different days - time noon
      let dataArray: Weather[] = [];
      //push first weather obj into array
      dataArray.push(originalDataArray[0]);
      //search for noon temp - and only push the obj that match
      for(let i = 1; i < originalDataArray.length; i++){
        let iterationDate = originalDataArray[i].dt_txt;
        if(iterationDate.slice(-8) === '12:00:00') dataArray.push(originalDataArray[i]);
      }
      //loop array to create Weather obj to send to front-end
      dataArray.map((item: any) => {
        const date = new Date(item.dt_txt.slice(0, 10).replace(/-/g, "/"));
        const localeString = date.toLocaleDateString();
        
        const weather = new Weather(
          this.cityName,
          localeString,
          item.weather[0].icon,
          item.weather[0].description,
          item.main.temp,
          item.wind.speed,
          item.main.humidity
        );
        weatherArray.push(weather);
      });
      //return data;
      return weatherArray;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}

  /*
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        return this.destructureLocationData(data[0]);
      } else {
        throw new Error('No location found.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }
  */


  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}

  /*
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  */

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
 
 /* private buildGeocodeQuery(): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${process.env.API_KEY}`;
  }
  */
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}

  /*
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${process.env.API_KEY}`;
  }
  */

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  /*
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    return this.fetchLocationData(query);
  }
  */

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

 /*
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
  */
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}

  /*
  private parseCurrentWeather(response: any): Weather {
    const currentWeatherData = response.list[0]; // Assuming the first item is the current weather
    return new Weather(
      response.city.name,
      currentWeatherData.dt_txt,
      currentWeatherData.weather[0].icon,
      currentWeatherData.weather[0].description,
      currentWeatherData.main.temp,
      currentWeatherData.wind.speed,
      currentWeatherData.main.humidity
    );
  }
  */

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
 
 /*
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((forecast) => {
      return new Weather(
        currentWeather.city,
        forecast.dt_txt,
        forecast.weather[0].icon,
        forecast.weather[0].description,
        forecast.main.temp,
        forecast.wind.speed,
        forecast.main.humidity
      );
    });
  }
  */


  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  
  /*
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.set(city);
    try {
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData);
      return this.buildForecastArray(currentWeather, weatherData.list);
    } catch (error) {
      console.error('Error getting weather for city:', error);
      throw error;
    }
  }
  */

}
export default new WeatherService();