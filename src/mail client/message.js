
export class Message{
    static generateId(){
        return Math.random();
    }

    constructor(obj) {
        this._id = obj.id;
        this._message = obj.message;
        this._recipient = obj.recipient;
        this._sender = obj.sender;
    }

    get id(){return this._id;}
}
