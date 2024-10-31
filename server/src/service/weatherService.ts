import dotenv from 'dotenv';
dotenv.config();


// TODO: Define a class for the Weather object
class Weather { //Weather class with properties to store weather data 
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

// TODO: Complete the WeatherService class
class WeatherService { //
  // TODO: Define the baseURL, API key, and city name properties
  protected cityName: string = ''; // city name property - set to empty string

  
  set(cityName: string) { // set method to set the city name property to the value passed in as an argument.
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
      const response = await fetch(url); //fetch data from url and store in response variable 
      const data = await response.json(); //convert response to json and store in data variable 
      const originalDataArray = data.list; //store list array in originalDataArray variable
      //break into different days - time noon
      let dataArray: Weather[] = []; //create empty array to store weather data
      //push first weather obj into array
      dataArray.push(originalDataArray[0]); //push first obj into array
      //search for noon temp - and only push the obj that match
      for(let i = 1; i < originalDataArray.length; i++){
        let iterationDate = originalDataArray[i].dt_txt;
        if(iterationDate.slice(-8) === '12:00:00') dataArray.push(originalDataArray[i]);
      }
      
      dataArray.map((item: any) => { //map through dataArray and create Weather obj to send to front-end
        const date = new Date(item.dt_txt.slice(0, 10).replace(/-/g, "/")); //convert date to readable format
        const localeString = date.toLocaleDateString(); //convert date to locale string
        
        const weather = new Weather( //create new Weather obj and store in weather variable 
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

}
export default new WeatherService();