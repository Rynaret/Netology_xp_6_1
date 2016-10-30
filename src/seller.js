export class Seller{
    static get maxMoviesCountInOrder(){return 5;}

    constructor(shop = null) {
        this._shop = shop;
    }

    get shop(){return this._shop;}
    set shop(value){this._shop = value;}

    getMovie(movieName){
        return this.shop.getMovie(movieName);
    }

    getMovies(moviesNames){
        if(moviesNames.length > Seller.maxMoviesCountInOrder){
            throw new Error(`Shop give only ${Seller.maxMoviesCountInOrder} movies in one order`);
        }

        return this.shop.getMovies(moviesNames);
    }
}