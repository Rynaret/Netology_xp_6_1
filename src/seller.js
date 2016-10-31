export class Seller{
    static get maxMoviesCountInOrder(){return 5;}

    constructor(shop = null, client = null) {
        this._shop = shop;
        this._client = client;
    }

    get client(){return this._client;}

    get shop(){return this._shop;}

    getMovies(moviesNames){
        this.checkClientDebt();

        if(moviesNames.length > Seller.maxMoviesCountInOrder){
            throw new Error(`Shop give only ${Seller.maxMoviesCountInOrder} movies in one order`);
        }

        return this.shop.getMovies(moviesNames);
    }

    checkClientDebt(){
        if(this.client.moviesOnHand){
            throw new Error('You must return the last one');
        }
    }
}