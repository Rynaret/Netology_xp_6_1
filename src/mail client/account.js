import { Message } from './message'

export class Account{

    constructor(obj) {
        this._name = obj.name;
        this._messages = obj.messages;
    }

    get messages(){return this._messages.map(x => new Message(x));}

    addMessage(from, msg){
        let newMessage = new Message({id: Message.generateId(), message: msg, recipient: this, sender: from});

        this._messages.push(newMessage);
    }

    get name(){return this._name;}

}
