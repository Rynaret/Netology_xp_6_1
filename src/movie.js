export class Movie{

    constructor(name = '') {
        this._name = name;
    }

    get name(){return this._name;}

    get discount(){return this._discount;}
    set discount(value){this._discount = value;}
}