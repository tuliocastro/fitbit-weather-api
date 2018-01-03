import AbstractProviderImpl from 'abstract-provider.impl.js';

const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?";

export default class OpenWeatherImpl {
  
  constructor(){
  }
  
  fetchWeather(config){
  
    var url = this.getURL(config);
    
    return fetch(url)
          .then((response) => {return response.json()})
          .then(this.transformResponse.bind(this))
  }
  
  getURL(config){

    let appid = config.accessKey;
    let lat = config.lat;
    let lon = config.lon;
    
    var url = ENDPOINT + 'appid=' + appid + '&lat=' + lat + '&lon=' + lon;
    
    return url;

  }
  
  transformResponse(data){
    
    let weather = {
        temperatureC : Math.round(data.main.temp - 273.15),
        temperatureF : Math.round((data.main.temp - 273.15)*9/5 + 32),
        humidity: data.main.humidity,
        location : data.name,
        description : data.weather[0].description,
        isDay : (data.dt > data.sys.sunrise && data.dt < data.sys.sunset),
        sunrise : data.sys.sunrise * 1000,
        sunset : data.sys.sunset * 1000,
        timestamp : new Date().getTime()
      };
    
    return weather;
  }
  
}

