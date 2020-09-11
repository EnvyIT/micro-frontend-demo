export class EventBus {

  constructor(broadcastChannel){
    this.broadcastChannel = broadcastChannel;
  }

  publish(topic, payload) {
    this.broadcastChannel?.postMessage({topic , payload});
  }

  subscribe(topic) {
    this.broadcastChannel?.onmessage = (event) => {
       if(event.data.topic === topic){
         return event.data;
       }
    }
  }


}
