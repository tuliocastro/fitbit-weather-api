import { peerSocket } from "messaging";
import { WEATHER_MESSAGE_DEVICE, WEATHER_MESSAGE_COMPANION } from './common.js';
import OpenWeatherImpl from 'impl/open-weather.impl.js';
import { geolocation } from "geolocation";
import * as socketChannel from "./socket.channel";
import * as util from "./weather.utils";

export default class WeatherCompanion {
  
  constructor(){
   
    this._accessKeys = [];
    this._provider = new OpenWeatherImpl();
    
    socketChannel.watch(WEATHER_MESSAGE_COMPANION, (deviceConfig) => {
      
      this._queryWeather(deviceConfig);
      
    });
    
  }
  
  setProvider(provider){
    this._provider = provider;
  }
  
  setAccessKeys(accessKeys){
    this._accessKeys = accessKeys;
  }
  
  getAccessKeys(){
    return this._accessKeys;
  }
  
  _queryWeather(config){
    
    config.accessKey = util.random(this.getAccessKeys());
    
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