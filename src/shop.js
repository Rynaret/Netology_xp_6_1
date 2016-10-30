import { Movie } from './movie.js'

export class Shop{
    static get minMoviesCountForDiscount(){return 2;}

    constructor(shop) {
        this._name = shop.name;
        this._movies = shop.movies;
    }

    get movies() {return this._movies.map(x => new Movie(x));}

    get name() {return this._name;}
    set name(value) {this._name = value;}

    haveMovie(movieName){return this.movies.find(x => x.name === movieName) !== undefined;}

    getMovie(movieName){
        if(!this.haveMovie(movieName)){
            throw new Error(`There is no movie with name ${movieName}`);
        }

        return this.movies.find(x => x.name === movieName);
    }

    getMovies(moviesNames){
        let movies = moviesNames.map(x => this.getMovie(x));

        if(movies.length >= Shop.minMoviesCountForDiscount){
            movies.forEach(movie => movie.discount = 5);
        }

        return movies
    }
}
