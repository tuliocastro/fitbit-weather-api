export default class AbstractProviderImpl{
  
  constructor(){
  }
  
  fetchWeather(config){
    throw new Error('You have to implement the method fetchWeather()');
  }
  
}

