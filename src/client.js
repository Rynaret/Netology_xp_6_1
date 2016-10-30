export class Client{
    static get discountForFriend(){return 10;}

    constructor() {
    }

    get discount(){return this._discount;}
    set discount(value){this._discount = value;}

    get moviesOnHand(){return this._moviesOnHand}
    set moviesOnHand(value){this._moviesOnHand = value;}

    inviteFriend(){this.discount = Client.discountForFriend;}

    clear(){this._moviesOnHand = null;}
}
