import assert from 'assert'
import { expect } from 'chai'
import {Shop} from '../src/shop.js'
import {Client} from '../src/client.js'
import {Seller} from '../src/seller.js'
import {Movie} from '../src/movie.js'

// Видеопрокат

// Клиент может взять фильм в прокат
// Клиент может взять несколько фильмов и получить скидку 5% за каждый
// Не выдавать больше 5 фильмов за раз одному клиенту
// Если клиент не вернул прошлый фильм, не выдавать ему новых
// Приведи друга, получи дополнительную скидку 10%

suite("When client in Video Rental shop", function () {
    let client = new Client();
    setup(function () {
        client.clear();
    });

    // Клиент может взять фильм в прокат
    suite("client ask 'Terminator' movie rental", function () {
        suite("shop have movies", function () {
            let shop = new Shop({movies: ['Terminator']});
            let seller = new Seller(shop, client);

            test("then seller give 'Terminator' movie", function () {
                const askMovieName = ['Terminator'];

                const movie = seller.getMovies(askMovieName);

                assert.equal(askMovieName[0], movie[0].name);
            });
        });
    });

    // Клиент может взять несколько фильмов и получить скидку 5% за каждый
    suite("client ask 'Terminator', 'Die Hard', 'Star Wars' movies", function () {
        suite("shop have movies", function () {
            const askThreeMovies = ['Terminator', 'Die Hard', 'Star Wars'];
            let shop = new Shop({movies: askThreeMovies});
            let seller = new Seller(shop, client);

            test('then client get 5% discount', function () {
                const askMoviesNames = askThreeMovies;

                const movies = seller.getMovies(askMoviesNames);

                askMoviesNames.forEach(name => {
                    const movie = movies.find(x => x.name === name);
                    assert.equal(movie.discount, 5);
                });
            });
        });
    });

    // Не выдавать больше 5 фильмов за раз одному клиенту
    suite("client ask 6 movies", function () {
        suite("shop have movies", function () {
            const askSixMovies = ['Terminator', 'Die Hard', 'Star Wars', 'Terminator 2', 'Terminator 3', 'Die Hard 2'];
            let shop = new Shop({movies: askSixMovies});
            let seller = new Seller(shop, client);

            test('then seller say: "Shop give only 5 movies in one order"', function () {
                const askMoviesNames = askSixMovies;

                const result = ()=>{seller.getMovies(askMoviesNames)};

                const expectedError = new Error(`Shop give only ${Seller.maxMoviesCountInOrder} movies in one order`);
                expect(result).to.throw(expectedError.message);
            });
        });
    });

    // Если клиент не вернул прошлый фильм, не выдавать ему новых
    suite("client ask 'Terminator' movie", function () {
        suite("client didn't return a last one", function () {
            let shop = new Shop({movies: ['Terminator']});

            let clientStub = new Client();
            clientStub.moviesOnHand = ['Die Hard'];

            let seller = new Seller(shop, clientStub);

            test('then seller say: "You must return the last one"', function () {
                const askMovieName = ['Terminator'];

                const result = () => {seller.getMovies(askMovieName)};

                expect(result).to.throw(/You must return the last one/);
            });
        });
    });
});

// Приведи друга, получи дополнительную скидку 10%
suite('When client invite friend', function(){
    let client = new Client();

    test('then client get 10% discount', function(){
        const mustGetDiscount = 10;

        client.inviteFriend();

        assert.equal(mustGetDiscount, client.discount);
    });
});
