import { peerSocket } from "messaging";

export function watch(msg, callback){
  
  peerSocket.addEventListener("message", (evt) => {
    
    var data = evt.data;
    
    if (data && data[msg] !== undefined) {
    
      callback(data[msg]);
      
    }
    
  });
  
}
