import { peerSocket } from "messaging";
import * as util from "../utils";
import * as socketChannel from "./socket.channel";
import { WEATHER_MESSAGE_DEVICE, WEATHER_MESSAGE_COMPANION } from './common.js';

const TIMEOUT_CONNECTION_LOOP = 5000;

export default class WeatherDevice {
  
  constructor(){
    
    this._onSuccess = dummyFunc;
    this._onError = dummyFunc;
    
    socketChannel.watch(WEATHER_MESSAGE_DEVICE, (data) => {
      
      this._onSuccess(data);
      
    });
    
  }
  
  setOnSuccess(fn){
    this._onSuccess = fn;
  }
  
  setOnError(fn){
    this._onError = fn;
  }
  
  fetch() {
    
    if (!this._isPeerSocketOpen()){
      
      console.log("socket nao esta pronto, tentando novamente");
      setTimeout(this.fetch.bind(this), TIMEOUT_CONNECTION_LOOP);
      return;
    }
    
    this._sendMessageToCompanion();
    
  }
  
  /**
  * Verify if peer socket is opened
  */
  _isPeerSocketOpen(){
    return peerSocket.readyState === peerSocket.OPEN
  }
  
  /**
  * Send a message to companion passing the access token
  */
  _sendMessageToCompanion(){
    
    var data = {};
    data[WEATHER_MESSAGE_COMPANION] = {}
    
    peerSocket.send(data);
  }
}


peerSocket.onopen = function() {
  console.log("Peer socket opened");
}

function dummyFunc(){}
