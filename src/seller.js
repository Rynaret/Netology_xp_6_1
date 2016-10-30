export class Seller{

    constructor(shop = null) {
        this._shop = shop;
    }

    get shop(){return this._shop;}
    set shop(value){this._shop = value;}

    getMovie(movieName){
        return this.shop.getMovie(movieName);
    }

    getMovies(moviesNames){
        return this.shop.getMovies(moviesNames);
    }
}