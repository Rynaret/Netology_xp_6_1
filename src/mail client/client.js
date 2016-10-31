export class Client{

    constructor(mailService, environment) {
        this._mailService = mailService;
        this._environment = environment;
    }

    get mailService(){return this._mailService;}
    get environment(){return this._environment;}

    availableConnectionToInternet(){
        return this.environment.checkInternet();
    }

    addToQueue(from, to, msg){

    }

    sendMessage(to, msg){
        if(!this.availableConnectionToInternet()){
            this.addToQueue(this, to, msg);
        }

        this.mailService.sendMessage(this, to, msg);
    }
}
