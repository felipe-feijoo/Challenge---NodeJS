const Movie = require('../src/models/Movie');
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../src/db/knexfile');
const knex = Knex(knexConfig);
Movie.knex(knex);


describe('Add a new favorite movie functionality', () => {

    test("It shouldn't let you insert repeated movies (same movieID - userID combination)", ()=> {
        const input = {
            movieId: 22949,
            userId: 5
        };
         
        expect(Movie.create(input.movieId, input.userId)).resolves.toBe(undefined);
    });

    test("It should add the 'addedAt' field to the favorite movie", () => {
        const input = {
            movieId: 22950,
            userId: 4
        };
        const output = {
            id: expect.anything(),
            api_movie_id: expect.anything(),
            user_id: expect.anything(),
            added_at:expect.anything()
        };
        expect(Movie.create(input.movieId, input.userId)).resolves.toMatchObject(output);
    });

  

});
