import { Message } from './message'

export class Client{

    constructor(mailService, environment) {
        this._mailService = mailService;
        this._environment = environment;
    }

    get mailService(){return this._mailService;}
    get environment(){return this._environment;}

    availableConnectionToInternet(){
        if(!this.environment.checkInternet()){
            return false;
        }

        this.sendAutomaticallyMessagesInQueue();

        return true;
    }

    sendAutomaticallyMessagesInQueue(){
        this.messagesInQueue.forEach((item)=>{
            this.mailService.sendMessage(item.sender, item.recipient, item.message);
        });
    }

    get messagesInQueue(){return this._messagesInQueue;}
    set messagesInQueue(value){this._messagesInQueue = value;}

    addMessageToQueue(msg){this._messagesInQueue.push(msg);}

    addToQueue(from, to, msg){
        let message = new Message({message: msg,recipient:to,sender:from});
        this.addMessageToQueue(message);
    }

    sendMessage(to, msg){
        if(!this.availableConnectionToInternet()){
            this.addToQueue(this, to, msg);
        }

        this.mailService.sendMessage(this, to, msg);
    }
}
