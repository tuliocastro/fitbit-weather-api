import { peerSocket } from "messaging";
import { WEATHER_MESSAGE_DEVICE, WEATHER_MESSAGE_COMPANION } from './common.js';
import OpenWeatherImpl from 'impl/open-weather.impl.js';
import { geolocation } from "geolocation";
import * as socketChannel from "./socket.channel";

export default class WeatherCompanion {
  
  constructor(){
   
    this._provider = new OpenWeatherImpl();
    
    socketChannel.watch(WEATHER_MESSAGE_COMPANION, (data) => {
      
      this._queryWeather(data);
      
    });
    
  }
  
  setProvider(provider){
    this._provider = provider;
  }
  
  _queryWeather(config){
    
    geolocation.getCurrentPosition(
      (pos) => {

        config.lat = pos.coords.latitude;
        config.lon = pos.coords.longitude;
        
        var impl = this._provider;
        
        impl.fetchWeather(config).then( (response) => {

          var messageBody = {};
          messageBody[WEATHER_MESSAGE_DEVICE] = response
    
          peerSocket.send(messageBody);
          
        });
        
      }, 
      (error) => {
        if(this.onerror) this.onerror(error);
      }, 
      {"enableHighAccuracy" : false, "maximumAge" : 1800});
    
  }
}