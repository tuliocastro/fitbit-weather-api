import * as messaging from "messaging";
import WeatherCompanion from '../common/weather/weather.companion';


const WEATHER_API_KEYS = ['YOUR OPEN WEATHER API KEY HERE'];

let weatherCompanion = new WeatherCompanion();
weatherCompanion.setAccessKeys(WEATHER_API_KEYS);

//weatherCompanion.setProvider(new YourProviderImpl()); //if you want to use ur own provider, uncomment this line and import your provider
