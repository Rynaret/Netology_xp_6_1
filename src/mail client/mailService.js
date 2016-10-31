import { Account } from './account'
import { Message } from './message'

export class MailService{

    constructor() {
    }

    get accounts(){return this._accounts.map(x => new Account(x));}
    set accounts(value){this._accounts = value;}

    create(account){
        this.accounts.push(account);
    }

    sendMessage(from, to, msg){
        this.attachMessageToRecipient(from, to, msg);
    }

    attachMessageToRecipient(from, to, msg){
        let recipient = new Account(to);

        recipient.addMessage(from, msg);
    }
}
