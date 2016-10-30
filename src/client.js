export class Client{

    constructor() {
    }

    get moviesOnHand(){return this._moviesOnHand}
    set moviesOnHand(value){this._moviesOnHand = value;}

    clear(){this._moviesOnHand = null;}
}
